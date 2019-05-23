import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { css } from "@emotion/core";
import RepoList from "../components/repository/RepoList";
import { useListBookmarks, notify } from "../hooks/https";
import { setRepositories } from "../actions/gitHubAction";
import { PropagateLoader } from "react-spinners";
import Typography from "@material-ui/core/Typography";

const Home = props => {
  const [bookmarkLoader, setBookmarkLoader] = useState(true);

  const override = css`
    height: calc(100vh - 64px);
    width: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
  `;
  useEffect(() => {
    props.setRepositories([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useListBookmarks()
      .then(response => {
        if (response.status === 404) {
          throw new Error("No results found");
        }
        if (!response.ok) {
          throw new Error("Error while fetching.");
        }
        return response.json();
      })
      .then(result => {
        setBookmarkLoader(false);
        props.setRepositories(result.data);
      })
      .catch(err => {
        notify("error", "No Result Found");
        setBookmarkLoader(false);
        console.log(err);
      });
  }, []);

  const { repos } = props;

  return (
    <Fragment>
      <main style={{ padding: "64px 0 64px" }}>
        <PropagateLoader
          css={override}
          sizeUnit={"px"}
          size={14}
          color={"#123abc"}
          loading={bookmarkLoader}
        />
        {repos.length > 0 && <RepoList repos={repos} isBookmark={true} />}
        {repos.length <= 0 && !bookmarkLoader && (
          <Typography
            className="error-msg"
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            No Bookmarks found , please search and star new repositories
          </Typography>
        )}
      </main>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  repos: state.gitHubReducer.repos,
  loading: state.gitHubReducer.loading
});

export default connect(
  mapStateToProps,
  { setRepositories }
)(Home);
