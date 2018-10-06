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
      console.log(err);
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

// Multer S3 Route
export const uploadStockImage = (formData, history) => dispatch => {
  console.log(formData);
  axios
    .post('/api/upload', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      // headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(res => {
      console.log(res.data);
    });
};
// Get the Signed URL from s3 Through backend and then upload the image to S3 Bucket.
export const uploadProfileImage = (
  formData,
  file,
  history
) => async dispatch => {
  const uploadConfig = await axios.get('api/upload');
  console.log(file);
  const uploadS3 = await axios.put(uploadConfig.data.url, file, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    }
  });
  console.log(`Axios returned from S3 ${uploadS3}`);
  // axios
  //   .post('/api/upload', formData, {
  //     headers: {
  //       'Content-Type': `application/x-www-form-urlencoded`,
  //       enctype: 'multipart/form-data'
  //     }
  //   })
  //   .then(res => {
  //     console.log(res.data);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
};

// CREATE STOCK
export const createProfile = (profileData, history) => dispatch => {
  console.log(profileData);
  axios
    .post('/api/stock', profileData)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      history.push('/stocks');
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Edit Stock
export const editStock = (profileData, history) => dispatch => {
  console.log(profileData);
  axios
    .post('/api/stock/edit', profileData)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      history.push('/stocks');
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Delete Stock
export const deleteStock = (id, history) => dispatch => {
  console.log(id);
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
