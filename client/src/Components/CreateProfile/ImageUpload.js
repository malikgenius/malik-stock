import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import FormData from 'form-data';

import {
  createProfile,
  uploadProfileImage,
  uploadStockImage
} from '../../actions/profileAction';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: ''
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    // this.setState({ files: e.target.files });
    formData.append('file', this.state.file[0]);

    // this.props.createProfile(formData, this.props.history);
    this.props.uploadStockImage(formData, this.props.history);
    // this.props.uploadProfileImage(
    //   formData,
    //   this.state.files,
    //   this.props.history
    // );
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // File Upload thorugh usual Input Tag..
  onFileChange = e => {
    this.setState({ file: e.target.files });
  };

  render() {
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add New Product</h1>
              <p className="lead text-center">
                Please fill all the fields with correct data to successfuly
                submit the form.
              </p>
              <small className="d-block pb-3">* = required fields</small>
            </div>
            <form onSubmit={this.onSubmit}>
              <input type="file" name="file" onChange={this.onChange} />
              <button type="submit">Upload</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// CreateProfile.propTypes = {
//   profile: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  success: state.success
});

export default connect(
  mapStateToProps,
  { createProfile, uploadProfileImage, uploadStockImage }
)(withRouter(ImageUpload));
