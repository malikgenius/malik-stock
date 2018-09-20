import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getCurrentProfile,
  deleteProfile,
  deleteAccount
} from '../../actions/profileAction';
import SpinnerLottie from '../Common/spinnerLottie';
import ProfileButtonsAction from './ProfileButtonsAction';
// Experience and Education...
import Experience from './Experience';

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getCurrentProfile();
  };

  onDeleteProfile = () => {
    this.props.deleteProfile(this.props.history);
  };
  onDeleteAccount = () => {
    this.props.deleteAccount(this.props.history);
  };
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    // check if user has a profile
    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = (
        <div>
          <SpinnerLottie />
        </div>
      );
    } else {
      // check if user has a profile... Object.keys(profile) will check profile length, we can check anythings length with Object.keys
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome,{' '}
              <Link to={`/profile/${profile.handle}`}>{user.name}</Link>{' '}
            </p>
            <ProfileButtonsAction />
            <Experience experience={profile.experience} />
            {/* Todo: Exp and Edu */}
            <div style={{ marginTop: '60px' }}>
              <div className="btn-group" role="group">
                <button
                  onClick={this.onDeleteProfile}
                  className="btn btn-danger mr-1"
                >
                  <i className="fas fa-clipboard-list  mr-1" />
                  Delete Profile
                </button>
                <button
                  onClick={this.onDeleteAccount}
                  className="btn btn-danger"
                >
                  <i className="fas fa-user-circle text-white mr-1" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            {' '}
            <p className="lead mb-0">
              <strong className="text-info text-capitalize">{user.name}</strong>{' '}
            </p>
            <p>
              You have not yet created a profile, please click the button below
              to make one.
            </p>
            <Link className="btn btn-info" to="/createprofile">
              Create Profile
            </Link>{' '}
          </div>
        );
      }
    }

    return (
      <div className="container ">
        <div className="row">
          <div className="col col-md-12">
            {/* <h1 className="display-md-4 lead p-0 "> {user.name} </h1>
            <p className="lead-md small-sm text-info">{user.email}</p> */}
            <div>{dashboardContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteProfile, deleteAccount }
)(withRouter(Dashboard));
