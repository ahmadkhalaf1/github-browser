import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  setRepositories,
  setSearchTerm,
  setLoading
} from "../actions/gitHubAction";
import { useSearchRepos, notify } from "../hooks/https";
import { PropagateLoader } from "react-spinners";

const styles = theme => ({
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  searchBtn: {
    alignSelf: "center"
  }
});

const SearchInput = props => {
  const { classes, term, loading } = props;

  // set search value into state
  const onChange = e => {
    if (e.target.value !== "") {
      // replace spaces with +
      let term = e.target.value.split(" ").join("+");
      props.setSearchTerm(term);
    } else {
      props.setRepositories([]);
      props.setSearchTerm("");
    }
  };

  // fetch repositories based on search term
  const useSearch = e => {
    props.setLoading(true);
    useSearchRepos(term)
      .then(response => {
        if (response.status === 404) {
          throw new Error("No results found");
        }
        if (!response.ok) {
          throw new Error("Error while fetching data");
        }
        return response.json();
      })
      .then(data => {
        props.setLoading(false);
        props.setRepositories(data.items);
      })
      .catch(err => {
        console.log("err", err.message);
        props.setRepositories([]);
        props.setLoading(false);
        notify('error',err.message);
        
      });
  };

  const handleKeyPress = target => {
    // if Enter key pressed , trigger search function
    if (target.key === "Enter") {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useSearch();
    }
  };

  return (
    <React.Fragment>
      <div className={classes.heroButtons}>
        <Grid container spacing={16} justify="center">
          <Grid item>
            <TextField
              id="outlined-full-width"
              className={classes.textField}
              label="Search"
              style={{ margin: 8 }}
              placeholder="ex: React Slider"
              onChange={onChange}
              onKeyDown={handleKeyPress}
              margin="normal"
              fullWidth
              variant="outlined"
            />
          </Grid>
          {!loading && (
            <Grid item className={classes.searchBtn}>
              <Button
                variant="contained"
                disabled={!term}
                onClick={useSearch}
                color="primary"
              >
                Search
              </Button>
            </Grid>
          )}
        </Grid>
        <Grid container spacing={16} justify="center">
          <Grid item className={classes.searchBtn}>
            <PropagateLoader
              sizeUnit={"px"}
              size={14}
              color={"#123abc"}
              loading={loading}
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

SearchInput.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  term: state.gitHubReducer.term,
  loading: state.gitHubReducer.loading
});

export default connect(
  mapStateToProps,
  { setRepositories, setSearchTerm, setLoading }
)(withStyles(styles)(SearchInput));
