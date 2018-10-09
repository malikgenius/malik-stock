import axios from 'axios';
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  CLEAR_ALL_PROFILES,
  GET_PAGINATION_PAGES,
  SET_CURRENT_USER
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Get All Profiles
export const getProfiles = page => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/stock/all`, {
      params: { page }
    })
    .then(res => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data.docs
      });
      // GET pagination will get all the extra pagination options to redux store
      // total records, page number, records per page .. etc from server.
      // this will go to Component local state via nextProps to <Pagination /> comp.
      dispatch({
        type: GET_PAGINATION_PAGES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// SEARCH PROFILES FOR SPECIFIC RECORD
export const getSearchedProfiles = (page, search, option) => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/stock/search`, {
      params: { page, search, option }
    })
    .then(res => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data.docs
      });
      // GET pagination will get all the extra pagination options to redux store
      // total records, page number, records per page .. etc from server.
      // this will go to Component local state via nextProps to <Pagination /> comp.
      dispatch({
        type: GET_PAGINATION_PAGES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

export const getProfileByHandle = () => {};
// Get Profile by ID
export const getProfileById = id => dispatch => {
  // console.log(id);
  dispatch(setProfileLoading());
  axios
    .get(`/api/stock/id/${id}`)
    .then(
      res => {
        // console.log(res.data);
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        });
      }

      // if wrong handle name, we have a null profile, nextProps in Profile.js will redirect it to Page not Found route.
    )
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: null
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Multer S3 Route -- i am doing it within form to get the Image url from cloudinary, see createprofile.js
export const uploadStockImage = (formData, history) => dispatch => {
  axios
    .post('/api/upload', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      // headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(res => {});
};

// CREATE STOCK
export const createProfile = (formData, history) => dispatch => {
  axios
    .post('/api/stock', formData)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      history.push(`/stock/${res.data._id}`);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Edit Stock
export const editStock = (profileData, history) => dispatch => {
  axios
    .post('/api/stock/edit', profileData)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      history.push('/stocks');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Delete Stock
export const deleteStock = (id, history) => dispatch => {
  if (
    // window.confirm will popup an alert from browser ..
    window.confirm('are you sure? you want to delete this Record.')
  ) {
    axios
      .delete(`/api/stock/deletestock/${id}`)
      .then(res => {
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        });
        history.push('/stocks');
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  }
};

// profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clearing Profile on logout
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

export const clearAllProfiles = () => {
  return {
    type: CLEAR_ALL_PROFILES
  };
};
