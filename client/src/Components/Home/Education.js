import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileAction';

class Education extends Component {
  onDeleteClick = id => {
    this.props.deleteEducation(id, this.props.history);
  };

  render() {
    const educationSmall = this.props.education.map(edu => (
      <div className=" pb-1  bg-light mb-2" key={edu._id}>
        <div className="row  pb-1 container ">
          <div className="col-1-mb-4 m-0 ">
            <i className="fas fa-school  fa-2x text-info  border  p-2 bg-light" />
          </div>
          <div className="col-8  align-content-end ml-0">
            <div className="h6 lead font-weight-light">{edu.school}</div>
            <div className="h6 text-muted mb-0 font-weight-light">
              {edu.degree}
            </div>
            <div className="small text-muted">
              <Moment format="DD/MM/YYYY">{edu.from}</Moment> {' - '}
              {edu.to === null ? (
                'current'
              ) : (
                <Moment format="DD/MM/YYYY">{edu.to}</Moment>
              )}
            </div>
          </div>
          <div className="div col-1 ml-auto">
            <i
              onClick={() => this.onDeleteClick(edu._id)}
              className="far fa-trash-alt text-danger"
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>
    ));

    const educationBig = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>

        <td className="d-none d-md-block">{edu.fieldofstudy}</td>
        <td>
          <Moment format="DD/MM/YYYY">{edu.from}</Moment>
        </td>
        <td>
          {edu.to === null ? (
            'current'
          ) : (
            <Moment format="DD/MM/YYYY">{edu.to}</Moment>
          )}
        </td>
        <td className="mr-auto">
          <i
            onClick={() => this.onDeleteClick(edu._id)}
            className="far fa-trash-alt text-danger"
            style={{ cursor: 'pointer' }}
          />
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="h4 mb-4">Education Credentials</h4>
        <div className="d-md-none ">{educationSmall}</div>

        {/* education Table on big screen  */}

        <table className="table table-sm d-none d-md-table">
          <thead>
            <tr>
              <th scope="col">School</th>
              <th scope="col">Degree</th>
              <th scope="col ">Majors</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th />
            </tr>
            {educationBig}
          </thead>
        </table>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteEducation }
)(withRouter(Education));
