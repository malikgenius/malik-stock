import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import Barcode from 'react-barcode';
import QRCode from 'qrcode.react';
import { getProfileById } from '../../actions/profileAction';

import Spinner from '../Common/spinnerLottie';

class QrCode extends Component {
  componentDidMount = () => {
    if (this.props.match.params.id) {
      this.props.getProfileById(this.props.match.params.id);
    }
  };
  componentWillReceiveProps = nextProps => {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/notfound');
    }
  };
  render() {
    const { profile, loading } = this.props.profile;
    console.log(`QRCODE: ${this.props.profile}`);
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link
                to={`/stock/${this.props.match.params.id}`}
                className="btn btn-light mb-3 float-left"
              >
                Back to Stocks
              </Link>
            </div>
          </div>

          <div className=" row">
            <div className="col-md-6 m-auto">
              <QRCode
                // below value can take a link to site, or anything.
                // value="https://localhost:3000/"
                // here we will share
                value={`
                ${'        '}https://www.malikgen.com/stock/${profile._id}
                `}
                // size={'128'}
                // bgColor={'#0000FF'}
                level={'L'}
                renderAs={'svg'}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.profile
  };
};
export default connect(
  mapStateToProps,
  { getProfileById }
)(QrCode);
