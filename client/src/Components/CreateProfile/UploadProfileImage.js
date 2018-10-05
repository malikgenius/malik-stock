import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
// import axios from 'axios';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import FormData from 'form-data';
import 'cropperjs/dist/cropper.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { uploadProfileImage } from '../../actions/profileAction';

class UploadProfileImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Dropzone files
      files: [],
      fileName: '',
      // Cropper States
      cropResult: null,
      image: {},
      errors: '',
      success: '',
      myfile: ''
    };
  }

  // componentDidMount = () => {
  //   toast('hello jaani');
  // };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors.error });
    }
    if (nextProps.success) {
      this.setState({ success: nextProps.success.success });
    }
  }

  toastNotify = () => {
    // toast('Default Notification !');
    if (this.state.success) {
      toast.success(this.state.success, {
        position: toast.POSITION.TOP_CENTER
      });
    }

    toast.error(this.state.errors, {
      position: toast.POSITION.TOP_LEFT
    });
  };

  // upload Image .. when click on check in dropzone preview
  uploadImage = async () => {
    try {
      await this.props.uploadProfileImage(
        this.state.image,
        this.state.fileName
      );
      this.cancelCrop();
      this.setState({ success: 'Success!, Image has been uploaded' });
    } catch (err) {
      this.setState({ errors: err });
    }
  };
  // when clicked on cancel
  cancelCrop = () => {
    this.setState({
      files: [],
      image: {}
    });
  };

  onSubmit = e => {
    e.preventDefault();
    // trying to send data through formData to backend Only Image will go
    // it working with uploadProfileImage and some headers defined in action.
    let formData = new FormData();
    formData.append('file', this.state.files[0], this.state.files[0].filename);
    // formData.append('file', this.state.cropResult);
    const options = { content: formData };
    this.props.uploadProfileImage(formData, this.props.history);
    // normal Way of sending data to redux / axios- i just named it form Data
  };

  onFocus = () => {
    this.setState({ errors: '' });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Dropzone
  onDrop = files => {
    this.setState({
      files,
      fileName: files[0].name
    });
    // below working fine with direct axios to server.
    // const formData = new FormData();
    // formData.append('file', files[0], files[0].filename);
    // axios
    //   .post('/api/profile', formData, {
    //     headers: {
    //       accept: 'application/json',
    //       'Accept-Language': 'en-US,en;q=0.8',
    //       'Content-Type': `application/x-www-form-urlencoded`
    //     }
    //   })
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };
  // Cropper
  cropImage = () => {
    if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      let imageUrl = URL.createObjectURL(blob);
      this.setState({
        cropResult: imageUrl,
        image: blob
      });
    }, 'image/jpg');

    // this.refs.cropper.getCroppedCanvas().toDataURL(data => {
    //   let imageUrl = URL.createObjectURL(data);
    //   this.setState({
    //     cropResult: imageUrl,
    //     image: data
    //   });
    // }, 'image/jpg');
    // other option is toDataURL which i have to check but will use blob for now.
    // console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
  };

  render() {
    const { errors, success } = this.state;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Upload Profile Image</h1>
              <p className="lead text-center">
                Please drag & drop your an Image
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                {/* testing simple file upload to compare with Dropzone */}

                {/* <div>
                  <input type="file" name="files" onChange={this.onChange} />
                </div> */}

                <div className="row container">
                  <div className="mb-3">
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
                  <div className="m-auto">
                    {this.state.files[0] && (
                      <Cropper
                        style={{ maxHeight: '200px', maxWidth: '200px' }}
                        ref="cropper"
                        src={this.state.files[0].preview}
                        //Rectangle image settings
                        // aspectRatio={16 / 9}
                        // square image settings
                        aspectRatio={1}
                        viewMode={0}
                        dragMode="move"
                        guides={true}
                        // scalable will let user freely crop
                        scalable={false}
                        cropBoxMovable={true}
                        cropBoxResizable={true}
                        crop={this.cropImage}
                      />
                    )}
                  </div>
                  {this.state.files[0] && (
                    <div className="m-auto row">
                      <img
                        className="col col-md-12"
                        style={{ maxHeight: '200px', maxWidth: '200px' }}
                        src={this.state.cropResult}
                      />
                      <div className="btn group col col-md-12">
                        <button
                          className="success"
                          type="button"
                          onClick={this.uploadImage}
                        >
                          <i className="fas fa-check " />
                        </button>
                        <button className="success" type="button">
                          <i className="far fa-times-circle" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>

              <ToastContainer />
              {errors && (
                <div className="text-center  text-danger text-muted text-sm mt-2">
                  {/* <strong>{errors}</strong> */}
                  <i className="fas fa-exclamation-triangle text-danger" />
                  {errors}
                </div>
              )}
            </div>
            {/* if Errors below function will run to show notificaitons on screen .. react-toastify */}
            {errors && this.toastNotify()}
            {/* Success Message ToastContainer  */}
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
  { uploadProfileImage }
)(withRouter(UploadProfileImage));
