import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILES,
  CLEAR_ALL_PROFILES,
  GET_PAGINATION_PAGES
} from '../actions/types';
const initialState = {
  profile: null,
  profiles: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        // this will add more profiles to store when paginate to next, but when
        //come back to prev page it will still add :( more... find a solution of duplicate
        // profiles: state.profiles.concat(action.payload),
        profiles: action.payload,
        loading: false
      };
    // get total pages from server via pagination at backend to show only those pages in FE pagination.
    // get total records from backend and save them in total ... we can show total on FE
    case GET_PAGINATION_PAGES:
      return {
        ...state,
        pages: action.payload.pages,
        total: action.payload.total,
        limit: action.payload.limit,
        page: action.payload.page
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
        pages: '',
        total: '',
        limit: '',
        page: ''
      };
    case CLEAR_ALL_PROFILES:
      return {
        ...state,
        profiles: null,
        pages: null,
        total: null,
        limit: null,
        page: null
      };
    default:
      return state;
  }
};
