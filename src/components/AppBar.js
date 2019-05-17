import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import GitHubIcon from "../icons/GitHubIcon";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Bookmarks from "../pages/BookMarks";
import Home from "./Home";
import Hidden from '@material-ui/core/Hidden';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
const styles = theme => ({
  appBar: {
    position: "fixed"
  },
  navLink: {
    textDecoration: "none",
    color: "white",
    marginLeft: "15px",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif"
  }
});

const TopAppBar = props => {
  const { classes } = props;

  return (
    <React.Fragment>
      <Router>
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Toolbar>
            <GitHubIcon />
            <Hidden xsDown>
              <Typography
                variant="h6"
                className={classes.title}
                color="inherit"
                noWrap
              >
                GitHub Browser
              </Typography>
            </Hidden>
            <NavLink
              to="/"
              exact
              activeClassName="active"
              className={classes.navLink}
            >
              Search
            </NavLink>
            <NavLink
              to="/bookmarks"
              activeClassName="active"
              className={classes.navLink}
            >
              Bookmarks
            </NavLink>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/bookmarks" component={Bookmarks} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

TopAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopAppBar);
