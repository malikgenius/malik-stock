import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileAction';
import SpinnerLottie from '../Common/spinnerLottie';

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getCurrentProfile();
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
        dashboardContent = <h4 className="display-4">Display Profile</h4>;
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            {' '}
            <p className="lead ">
              <strong className="text-info display-4 text-capitalize">
                {user.name}
              </strong>{' '}
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
  { getCurrentProfile }
)(withRouter(Dashboard));
