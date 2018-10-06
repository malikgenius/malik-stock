import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileAction';

class Experience extends Component {
  onDeleteClick = id => {
    this.props.deleteExperience(id, this.props.history);
  };
  render() {
    //Small Screen Row cols
    const experienceSmall = this.props.experience.map(exp => (
      <div className=" pb-1  bg-light mb-2" key={exp._id}>
        <div className="row container mb-1 ">
          <div className="col-1-mb-4 mr-1 ">
            <i className="fa fa-black-tie  fa-2x text-info  border  p-2 bg-light" />
          </div>
          <div className="col-8  align-content-end m-auto">
            <div className="h6 lead font-weight-light">{exp.company}</div>
            <div className="h6 text-muted mb-0 font-weight-light">
              {exp.title}
            </div>
            <div className="small text-muted">
              <Moment format="DD/MM/YYYY">{exp.from}</Moment> {' - '}
              {exp.to === null ? (
                'current job'
              ) : (
                <Moment format="DD/MM/YYYY">{exp.to}</Moment>
              )}
            </div>
          </div>
          <div className="div col-1 ml-auto">
            <i
              onClick={() => this.onDeleteClick(exp._id)}
              className="far fa-trash-alt text-danger"
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>
    ));
    // Big & Middle screen only -- TABLE
    const experienceBig = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="DD/MM/YYYY">{exp.from}</Moment>
        </td>
        <td>
          {exp.to === null ? (
            'current job'
          ) : (
            <Moment format="DD/MM/YYYY">{exp.to}</Moment>
          )}
        </td>
        <td className="mr-auto">
          <i
            onClick={() => this.onDeleteClick(exp._id)}
            className="far fa-trash-alt text-danger"
            style={{ cursor: 'pointer' }}
          />
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <div className=" d-md-none">{experienceSmall}</div>
        <table className="table table-sm d-none d-md-table">
          <thead>
            <tr>
              <th scope="col">Company</th>
              <th scope="col">Title</th>
              <th scope="col">From</th>
              <th scope="col">Till</th>
              <th />
            </tr>
            {experienceBig}
          </thead>
        </table>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteExperience }
)(withRouter(Experience));
