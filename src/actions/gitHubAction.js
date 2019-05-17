import { IS_LOADING, SET_REPOSITORIES , SET_SEARCH_TERM } from "../types";

// Actions
export const setLoading = loadingFlag => ({
  type: IS_LOADING,
  payload: loadingFlag
});

export const setRepositories = repos => ({
  type: SET_REPOSITORIES,
  payload: repos
});


export const setSearchTerm = term => ({
    type: SET_SEARCH_TERM,
    payload: term
  });