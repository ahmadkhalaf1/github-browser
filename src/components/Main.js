import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import SearchInput from "./SearchInput";
import Icon from '@material-ui/core/Icon';
const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  main:{
    paddingTop:'64px'
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `64px 0 64px`
  },
  starIcon:{
    lineHeight:'30px;'
  }
});

const Main = props => {
  const { classes } = props;

  return (
    <React.Fragment>
      <main className={classes.main}>
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Search Repositories
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph
            >
              If you can name it - you can {<Icon className={classes.starIcon}>star</Icon>} it !
            </Typography>
            <SearchInput />
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
