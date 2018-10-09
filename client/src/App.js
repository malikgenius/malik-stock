import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// CSS File Loaded
import './App.scss';
//Store Actions etc
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authAction';
import { clearCurrentProfile, clearAllProfiles } from './actions/profileAction';
import { Provider } from 'react-redux';
import configureStore from './reducers';
// Private Route
import PrivateRoute from './Components/Common/PrivateRoute';
// Components
import HeaderNavbar from './Components/HeaderNavbar';
import FooterModal from './Components/FooterModal';
// Dashboard & Profile Components
import Dashboard from './Components/Home/Dashboard';
import CreateProfile from './Components/CreateProfile/CreateProfile';
import ImageUpload from './Components/CreateProfile/ImageUpload';
import EditProfile from './Components/CreateProfile/EditProfile';
import UploadProfileImage from './Components/CreateProfile/UploadProfileImage';
// Stocks
import Stocks from './Components/Profiles/Stocks';
import SearchStocks from './Components/SearchStocks/SearchStocks';
import Stock from './Components/Profile/Stock';
import ProfileNotFound from './Components/Profile/ProfileNotFound';
import QrCode from './Components/Profile/QrCode';

//FontAwesome and BootStrap config
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

// Store
const store = configureStore();

// check for user
if (localStorage.jwtToken) {
  //Set Auth token header auth setAuthToken function makes sure that Authorization Headers have the token.
  // if we dont do this, token will be in localStorage only but not in headers to verify with backend.
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(clearCurrentProfile());
    store.dispatch(clearAllProfiles());
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <HeaderNavbar />
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/notfound" component={ProfileNotFound} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/createstock" component={CreateProfile} />
              <Route path="/imageupload" component={ImageUpload} />
              <Route path="/edit-profile/:id" component={EditProfile} />
              <Route
                path="/upload-profileimage"
                component={UploadProfileImage}
              />
              <Route path="/stocks" component={Stocks} />
              <Route path="/search-stock" component={SearchStocks} />
              <Route path="/stock/:id" component={Stock} />
              <Route path="/qrcode/:id" component={QrCode} />
            </Switch>
            <FooterModal />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
