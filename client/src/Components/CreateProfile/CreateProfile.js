import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import FormData from 'form-data';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
// cloudinary react SDK
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import 'cropperjs/dist/cropper.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextFieldGroup from '../Common/TextFieldGroup';
import TextAreaFieldGroup from '../Common/TextAreaFieldGroup';
import Spinner from '../Common/spinnerLottie';
// import fileStack from '../../config/Keys';
import {
  createProfile,
  // uploadProfileImage,
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
      files: '',
      imageurl: '',
      imagepublicid: '',
      cropResult: null,
      image: {},
      errors: '',
      success: '',
      disabled: false,
      progress: false
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
  //clear any errors on Focus
  onFocus = () => {
    this.setState({ errors: '' });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
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
  // IMAGE FUNCTIONS ALL HERE ..
  // Dropzone
  onDrop = files => {
    this.setState({
      files,
      filename: files[0].name,
      disabled: true
    });
  };
  // Cropper
  cropImage = () => {
    if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      let imageUrl = URL.createObjectURL(blob);
      console.log(imageUrl);
      console.log(this.state.image);
      this.setState({
        cropResult: imageUrl,
        image: blob
      });
    }, 'image/jpeg');
  };
  // upload Image from DropZONE and Cropper .. when click on check in dropzone preview
  uploadImage = async () => {
    //disable submit button, user shouldnt be able to submit before image upload
    this.setState({ disabled: true });
    const file = this.state.image;
    const formData = new FormData();
    // Spinner activated
    this.setState({ progress: true });
    // this.setState({ files: e.target.files });
    formData.append('file', file);
    await axios
      .post('/api/upload', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        // headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          imageurl: res.data.secure_url,
          imagepublicid: res.data.public_id,
          disabled: false,
          progress: false
        });
      });
    this.cancelCrop();
  };
  // when clicked on cancel
  cancelCrop = () => {
    this.setState({
      files: [],
      image: {},
      disabled: false
    });
  };
  // FileStack.com Button Function on success
  // fileStackSuccess = response => {
  //   console.log(response);
  //   this.setState({
  //     image: response.filesUploaded[0].url,
  //     filename: response.filesUploaded[0].originalFile.name
  //   });
  // };

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
      imageurl: this.state.imageurl,
      imagepublicid: this.state.imagepublicid
    };
    this.props.createProfile(formData, this.props.history);
  };

  render() {
    const { errors } = this.state;
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
                {/* DropZONE & CropperJS dropping and cropping at same time ..  */}
                <div className="row container">
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
                  <div className=" col-md-4">
                    {this.state.files[0] ? (
                      <Cropper
                        style={{
                          maxHeight: '200px',
                          maxWidth: '200px',
                          marginTop: 0
                        }}
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
                    ) : (
                      <CloudinaryContext cloudName="malikgen">
                        <Image publicId={this.state.imagepublicid}>
                          <Transformation width="200" crop="scale" angle="10" />
                        </Image>
                      </CloudinaryContext>
                    )}
                  </div>
                  {this.state.files[0] && (
                    <div className="m-auto col-md-4">
                      <img
                        // className="col col-md-12"
                        style={{ maxHeight: '200px', maxWidth: '200px' }}
                        src={this.state.cropResult}
                      />
                      <div className="col col-md-12 mt-1">
                        <button
                          className="btn btn-outline-success float-left btn-sm"
                          type="button"
                          onClick={this.uploadImage}
                        >
                          <i className="fas fa-check m-1" />
                          confirm
                        </button>
                        <button
                          className="btn btn-outline-danger float-right btn-sm"
                          type="button"
                          onClick={this.cancelCrop}
                        >
                          <i className="far fa-times-circle m-1" />
                          cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* <ReactFilestack
                  apikey={fileStack.apiKey}
                  buttonText="Click me"
                  buttonClass="classname"
                  mode={'pick'}
                  // options={options}
                  onSuccess={response => this.fileStackSuccess(response)}
                /> */}
                {/* DropZone to send images backend and 2 cloudinary */}

                {this.state.progress ? (
                  <Spinner />
                ) : (
                  <div>
                    {' '}
                    <div className="row container">
                      <div className="mb-3 col-md-4" />
                      <div className=" col-md-4" />
                    </div>
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-info btn-block mt-4 mb-4"
                      disabled={this.state.disabled}
                    />
                  </div>
                )}
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
  { createProfile, uploadStockImage }
)(withRouter(CreateProfile));
