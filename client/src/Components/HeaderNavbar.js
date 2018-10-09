import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import { stack as Menu } from 'react-burger-menu';
import Animate from 'react-smooth';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Modal,
  ModalBody,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink
} from 'reactstrap';

import {
  logoutUser,
  loginUser,
  loginSocialUser,
  getSuccessReset,
  getLoginErrorReset
} from '../actions/authAction';
import {
  clearCurrentProfile,
  clearAllProfiles
} from '../actions/profileAction';
import InputGroup from './Common/InputGroup';
// import { link } from 'fs';

class HeaderNavbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-light bg-light"
          style={{ backgroundColor: '#e3f2fd' }}
        >
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              Company Brand
            </Link>
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <Link
                  className="nav-link btn btn-link border-0 text-muted"
                  to="/stocks"
                >
                  Stocks
                </Link>
              </li>
              <Link
                className="nav-link btn btn-link border-0 text-muted"
                to="/search-stock"
              >
                Search Stock
              </Link>
              <Link
                className="nav-link btn btn-link border-0 text-muted"
                to="/createstock"
              >
                Create Stock
              </Link>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">
                  Sign In
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    profile: state.profile,
    // login errors are different than normal errors, just to show it on Modals.
    errors: state.errors,
    success: state.success
  };
};

export default connect(
  mapStateToProps,
  {
    logoutUser,
    clearCurrentProfile,
    clearAllProfiles,
    loginUser,
    loginSocialUser,
    getSuccessReset,
    getLoginErrorReset
  }
)(withRouter(HeaderNavbar));
