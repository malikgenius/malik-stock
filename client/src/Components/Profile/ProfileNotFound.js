import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProfileNotFound extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/stocks" className="btn btn-light mb-3 float-left">
              Back to Profiles
            </Link>
          </div>
          <div className="col-md-6" />
        </div>
        <div className="container">
          <div className="display-4 text-center m-auto mb-2">
            Page Not Found
          </div>
          <p className="text-muted text-center">
            Sorry we couldnt find a page you were looking for
          </p>
        </div>
      </div>
    );
  }
}

export default ProfileNotFound;
