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
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        {/* <td>
          <Moment>{edu.from}</Moment>
        </td> */}
        {/* from and to dates will only be shown on mid screen and not on small one  d-none is for all and d-md-block will show on mid screen and higher only.*/}
        {/* <td className="d-none d-md-block">{edu.fieldofstudy}</td> */}
        <td className="d-none d-md-block">
          <Moment format="DD/MM/YYYY">{edu.from}</Moment>
        </td>
        <td className="d-none d-md-block">
          {edu.to === null ? (
            'current'
          ) : (
            <Moment format="DD/MM/YYYY">{edu.to}</Moment>
          )}
        </td>
        <td>
          <i
            onClick={() => this.onDeleteClick(edu._id)}
            class="far fa-trash-alt text-danger"
            style={{ cursor: 'pointer' }}
          />
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="h4 mb-4">Education Credentials</h4>
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">School</th>
              <th scope="col">Degree</th>
              {/* <th scope="col " className="d-none d-md-block">
                Majors
              </th> */}
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th />
            </tr>
            {education}
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
