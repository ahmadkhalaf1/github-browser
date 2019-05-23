import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import RepoCard from "./RepoCard";

const styles = theme => ({
  layout: {
    width: "auto",
    textAlign: "center",
    padding: "21px 0 !important",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  }
});

const RepoList = props => {
  const { classes, repos, isBookmark } = props;
  console.log(repos);
  return (
    <React.Fragment>
      <div className={classNames(classes.layout, classes.cardGrid)}>
        {/* End hero unit */}
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          #{repos.length} Repository
        </Typography>
        <Grid container spacing={24}>
          {repos.length > 0 && repos.map((card, index) => (
            <RepoCard card={card} key={index} isBookmark={isBookmark} />
          ))}
        </Grid>
      </div>
    </React.Fragment>
  );
};

RepoList.propTypes = {
  classes: PropTypes.object.isRequired,
  isBookmark: PropTypes.bool
};

export default withStyles(styles)(RepoList);
