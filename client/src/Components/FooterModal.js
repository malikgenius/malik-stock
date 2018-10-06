import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, ModalBody } from 'reactstrap';
import { contactEmail, getErrorReset } from '../actions/contactAction';
import InputGroup from './Common/InputGroup';
import TextAreaFieldGroup from './Common/TextAreaFieldGroup';

class FooterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: '',
      email: '',
      message: '',
      errors: '',
      success: undefined
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors.error });
    }
    // if email sent successfuly redux store will have success, we dont want contact
    //modal to be shown if email sent !
    if (nextProps.success.success) {
      this.setState({ modal: false });
    }
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    this.props.getErrorReset();
  };

  // onFocus clear all the errors, while user is typing in email or password, we dont need to show them old error.
  onFocus = () => {
    this.setState({
      errors: '',
      success: undefined
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onformSubmit = e => {
    e.preventDefault();
    const userData = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message
    };
    this.props.contactEmail(userData, this.props.history);
    this.props.getErrorReset();
    // this.setState({ modal: false });
  };

  render() {
    const { errors } = this.state;
    return (
      <footer className="footerModal">
        <div>
          <div
            id="footer"
            className="bg-dark text-muted "
            style={{ marginTop: '100px' }}
          >
            <div className="container">
              <div className="row mr-0 ml-0">
                <div className="col text-center">
                  <div className="py-2">
                    <h1 className="h5">MY COMPANY L.L.C</h1>
                    <p>Copyright &copy; {new Date().getFullYear()}</p>
                    <button
                      className="btn btn-outline-primary"
                      onClick={this.toggle}
                      //   data-toggle="modal"
                      //   data-target="#contactModal"
                    >
                      Contact Us{' '}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              id="contact-modal"
              className="bg-primary"
              style={{ color: 'green' }}
            >
              <ModalBody className="bg-dark">
                <div
                  className=" text-center card-form bg-dark"
                  style={{ borderRadius: '5px' }}
                >
                  <div
                    className="modal-header p-0"
                    style={{ borderBottom: 'none' }}
                  >
                    <button
                      type="button"
                      className="close text-white"
                      onClick={this.toggle}
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="card-body">
                    <h3 className="text-white display-4 mb-5">Speak Up</h3>

                    <form onSubmit={this.onformSubmit} className="card-form">
                      <div className="form-group text-light">
                        <InputGroup
                          placeholder="Name"
                          name="name"
                          type="text"
                          icon="fa fa-user"
                          value={this.state.name}
                          onChange={this.onChange}
                          onFocus={this.onFocus}
                        />
                        <InputGroup
                          placeholder="Email"
                          name="email"
                          type="email"
                          icon="fa fa-at"
                          value={this.state.email}
                          onChange={this.onChange}
                          onFocus={this.onFocus}
                        />
                        <TextAreaFieldGroup
                          name="message"
                          className="form-control form-control-lg mb-2 bg-dark text-light"
                          placeholder="Speak your heart off"
                          value={this.state.message}
                          onChange={this.onChange}
                          onFocus={this.onFocus}
                          rows="5"
                        />

                        <button
                          type="submit"
                          //   onClick={}
                          className="btn btn-outline-secondary btn-block text-white"
                        >
                          <i class="fas fa-envelope mr-2 lead" />
                        </button>
                        {errors && (
                          <small className="text-center  text-danger text-muted  mt-2">
                            <i className="fas fa-exclamation-triangle text-danger mr-3" />
                            {errors}
                          </small>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </footer>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    // login errors are different than normal errors, just to show it on Modals.
    errors: state.errors,
    success: state.success
  };
};

export default connect(
  mapStateToProps,
  { contactEmail, getErrorReset }
)(withRouter(FooterModal));
