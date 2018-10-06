import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ReactS3Uploader from 'react-s3-uploader';
import ReactFilestack, { client } from 'filestack-react';
// core cloudinary library
import cloudinary from 'cloudinary-core';
// cloudinary react SDK
import {
  Image,
  Video,
  CloudinaryContext,
  Transformation
} from 'cloudinary-react';
import 'cropperjs/dist/cropper.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextFieldGroup from '../Common/TextFieldGroup';
import TextAreaFieldGroup from '../Common/TextAreaFieldGroup';

import fileStack from '../../config/Keys';
import {
  createProfile,
  uploadProfileImage,
  uploadStockImage
} from '../../actions/profileAction';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bay: '',
      column: '',
      row: '',
      side: '',
      well: '',
      depth: '',
      box: '',
      sample: '',
      status: '',
      filename: '',
      image: '',
      errors: '',
      success: ''
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
  // Toast Notifications
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

  onSubmit = e => {
    e.preventDefault();
    const formData = {
      bay: this.state.bay,
      column: this.state.column,
      row: this.state.row,
      side: this.state.side,
      well: this.state.well,
      depth: this.state.depth,
      box: this.state.box,
      sample: this.state.sample,
      status: this.state.status,
      image: this.state.image,
      filename: this.state.filename
    };
    this.props.createProfile(formData, this.props.history);
    // if (this.state.files) {
    //   S3FileUpload.uploadFile(this.state.files[0], S3config).then(data => {
    //     console.log(data);
    //     // have to add uploadFile in formData but its not working so leave it for now.
    //     this.props.createProfile(formData, this.props.history);
    //   });
    // } else {
    //   this.props.createProfile(formData, this.props.history);
    // }
  };

  onFocus = () => {
    this.setState({ errors: '' });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // FileStack.com Button Function on success
  fileStackSuccess = response => {
    console.log(response);
    this.setState({
      image: response.filesUploaded[0].url,
      filename: response.filesUploaded[0].originalFile.name
    });
  };

  // Dropzone

  render() {
    const { errors, success, displaySocialInputs } = this.state;

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
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Bay"
                  name="bay"
                  value={this.state.bay}
                  onChange={this.onChange}
                  info="Bay Info"
                  onFocus={this.onFocus}
                />

                <TextFieldGroup
                  placeholder="Column"
                  name="column"
                  value={this.state.column}
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Row"
                  name="row"
                  value={this.state.row}
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  info="Could be your own website or a company one"
                />
                <TextFieldGroup
                  placeholder="Side"
                  name="side"
                  value={this.state.side}
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="* Well number or name"
                  name="well"
                  value={this.state.well}
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  info="Please profile Well number or name"
                />
                <TextFieldGroup
                  placeholder="Depth (Feet\Meters)"
                  name="depth"
                  value={this.state.depth}
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  info="Depth in FEETs or Meters"
                />
                <TextFieldGroup
                  placeholder="Box Number"
                  name="box"
                  value={this.state.box}
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  info="Box number here"
                />

                <TextFieldGroup
                  placeholder="Sample Type"
                  name="sample"
                  value={this.state.sample}
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  info="Mention the type of Sample"
                />

                <TextAreaFieldGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  info="Status of Product"
                />
                <label className="mr-3 mb-4">Upload Image</label>
                <ReactFilestack
                  apikey={fileStack.apiKey}
                  buttonText="Click me"
                  buttonClass="classname"
                  mode={'pick'}
                  // options={options}
                  onSuccess={response => this.fileStackSuccess(response)}
                />
                <CloudinaryContext cloudName="demo">
                  <Image publicId="sample">
                    <Transformation width="200" crop="scale" angle="10" />
                  </Image>
                </CloudinaryContext>

                <div className="row container">
                  <div className="mb-3 col-md-4" />
                  <div className=" col-md-4" />
                </div>

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4 mb-4"
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
  { createProfile, uploadProfileImage, uploadStockImage }
)(withRouter(CreateProfile));
