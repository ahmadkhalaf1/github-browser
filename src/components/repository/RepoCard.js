import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { setRepositories } from "../../actions/gitHubAction";
import {
  useBookmarkRepo,
  useRemoveBookmark,
  notify,
  formatStars
} from "../../hooks/https";
import Icon from "@material-ui/core/Icon";
const styles = theme => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  cardAction: {
    justifyContent: "center",
    paddingBottom: "16px"
  },
  starIcon: {
    lineHeight: "20px;"
  },
  starButton: {
    border: "1px solid"
  },
  activeStarButton: {
    border: "1px solid",
    backgroundColor: "#32fe32d9 !important"
  }
});

const RepoCard = props => {
  const { classes, card, isBookmark, repos } = props;

  const [isStarActive, setStarActive] = useState(false);

  const Bookmark = (owner, repo) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // set repo as bookmark using api
    useBookmarkRepo(owner, repo)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error while adding bookmark");
        }
        return response.json();
      })
      .then(data => {
        setStarActive(true);
        notify("success", data);
      })
      .catch(err => {
        console.log(err);
        setStarActive(false);
        notify("error", err.message);
      });
  };

  const RemoveBookMark = (owner, repo, id) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // remove repo as bookmark using api
    useRemoveBookmark(owner, repo)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error while removing bookmark");
        }
        return response.json();
      })
      .then(data => {
        props.setRepositories(
          repos.filter(function(a) {
            return a.id !== id;
          })
        );

        notify("success", data);
      })
      .catch(err => {
        console.log(err);
        notify("error", err.message);
      });
  };

  return (
    <React.Fragment>
      <Grid item sm={6} md={4} xs={12} lg={4}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={card.owner.avatar_url}
            title="Image title"
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {card.full_name}
            </Typography>
            <Typography>{card.description}</Typography>
          </CardContent>
          <CardActions className={classes.cardAction}>
            {!isBookmark && (
              <Button
                className={
                  isStarActive ? classes.activeStarButton : classes.starButton
                }
                size="small"
                color="primary"
                onClick={() => Bookmark(card.owner.login, card.name)}
              >
                <Icon className={classes.starIcon}>star</Icon> Star{" "}
                {formatStars(card.stargazers_count)}
              </Button>
            )}
            {isBookmark && (
              <Button
                className={
                  isStarActive ? classes.activeStarButton : classes.starButton
                }
                size="small"
                color="primary"
                onClick={() =>
                  RemoveBookMark(card.owner.login, card.name, card.id)
                }
              >
                <Icon className={classes.starIcon}>star</Icon> Remove
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  );
};

RepoCard.propTypes = {
  classes: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired,
  repos: PropTypes.array.isRequired,
  isBookmark: PropTypes.bool
};

const mapStateToProps = state => ({
  term: state.gitHubReducer.term,
  repos: state.gitHubReducer.repos,
  loading: state.gitHubReducer.loading
});

export default connect(
  mapStateToProps,
  { setRepositories }
)(withStyles(styles)(RepoCard));
