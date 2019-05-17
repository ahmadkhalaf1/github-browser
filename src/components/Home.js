import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Main from "./Main";
import RepoList from "./repository/RepoList";
import { setRepositories } from "../actions/gitHubAction";


const Home = props => {
  const { repos } = props;

  useEffect(() => {
    // reset repo list after viewing bookmarked
    props.setRepositories([]);
  }, []);

  return (
    <Fragment>
      <Main />
      {repos.length > 0 && <RepoList repos={repos} />}
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
