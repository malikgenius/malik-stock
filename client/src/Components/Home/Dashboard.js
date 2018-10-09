import React, { Component } from 'react';

import SpinnerLottie from '../Common/spinnerLottie';

class Dashboard extends Component {
  render() {
    return (
      <div className="container ">
        <div className="row">
          <div className="col col-md-6 m-auto">
            <div className="display-1  p-0 text-center mt-4">
              {' '}
              Authentication Goes Here..{' '}
            </div>
            <p className="lead-md small-sm text-info text-center">
              only authenticated users will pass this page...
            </p>{' '}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
