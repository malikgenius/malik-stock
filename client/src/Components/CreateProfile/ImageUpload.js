import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';
// import FormData from 'form-data';
import {
  createProfile,
  // uploadProfileImage,
  uploadStockImage
} from '../../actions/profileAction';
import cloudinary from '../../config/Keys';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      fileName: ''
    };
  }
  // Dropzone
  onDrop = files => {
    this.setState({
      files,
      fileName: files[0].name
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const files = this.state.files[0];
    const formData = new FormData();
    // this.setState({ files: e.target.files });
    formData.append('file', files);
    // thats how we add text fields in formData request
    formData.append('name', this.state.fileName);
    // formData.append('upload_preset', cloudinary.cloudinary_UPLOAD_PRESET);
    // axios to upload image
    // axios
    //   .post(
    //     cloudinary.cloudinary_URL,
    //     {
    //       headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    //     },
    //     formData
    //   )
    //   .then(res => {
    //     console.log(res.data);
    //   });

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
    console.log(this.state.files[0]);
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
              <input type="file" name="files" onChange={this.onChange} />
              <button type="submit">Upload</button>
              <div className="mb-3 col-md-4">
                <Dropzone
                  onDrop={this.onDrop}
                  // multiple={false}
                  // style={{ maxHeight: '100px', maxWidth: '100px' }}
                >
                  <div className="text-center mt-4">
                    <i className="fas fa-upload fa-4x text-center mb-3" />
                    <p className="lead text-center mb-5">Drop Image here</p>
                  </div>
                </Dropzone>
              </div>
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
  { createProfile, uploadStockImage }
)(withRouter(ImageUpload));
