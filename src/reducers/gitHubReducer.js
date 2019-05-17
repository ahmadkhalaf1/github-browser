import { IS_LOADING, SET_REPOSITORIES, SET_SEARCH_TERM } from "../types";

const initialState = {
  repos: [],
  loading: false,
  term: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_REPOSITORIES:
      return {
        ...state,
        repos: action.payload
      };
    case SET_SEARCH_TERM:
      return {
        ...state,
        term: action.payload
      };
    default:
      return state;
  }
};
