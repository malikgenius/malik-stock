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

// Get Current Profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(
      res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        })

      // we can register with empty profile, if no profile we should return empty profile in err
    )
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
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
      'Content-Type': file.type
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

// Add Experience to Profile
export const addEducation = (eduData, history) => dispatch => {
  // return console.log(expData);
  axios
    .post('/api/profile/education', eduData)
    .then(res => {
      history.push('/dashboard');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Delete Experience
export const deleteEducation = id => dispatch => {
  if (
    // window.confirm will popup an alert from browser ..
    window.confirm('are you sure? you want to delete Qualification.')
  ) {
    axios
      .delete(`/api/profile/education/${id}`)
      .then(res => {
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        });
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

// Delete Profile Only not the Account
export const deleteProfile = history => dispatch => {
  if (
    // window.confirm will popup an alert from browser ..
    window.confirm(
      'are you sure? your profile will be deleted but account remains active.'
    )
  ) {
    axios
      .delete('/api/profile/deleteprofile')
      .then(res => {
        dispatch({
          type: CLEAR_CURRENT_PROFILE
        });
        dispatch({
          type: GET_PROFILE,
          payload: {}
        });
        history.push('/dashboard');
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  }
};

// Delete Account which will delete Profile as well.
export const deleteAccount = () => dispatch => {
  if (window.confirm('are you sure? this can Not be reverse')) {
    axios
      .delete('/api/profile/deleteuser')
      .then(res => {
        // we need to remove token from localstorage or it will be there till expires.
        localStorage.removeItem('jwtToken');
        // setAuthToken shoudl be false.. check its function and video again ..
        setAuthToken(false);
        // current user null will wipe the redux store with null user.
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        });
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  }
};
