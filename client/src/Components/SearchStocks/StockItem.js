import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profileAction';

class StockItem extends Component {
  // onStockClick = id => {
  //   this.props.getProfileById(id);
  // };
  render() {
    const { profiles } = this.props;

    // Small Screen Row cols
    const stockSmall = profiles.map(profile => (
      <div className=" pb-1  bg-light mb-2 " key={profile._id}>
        <div className="row container mb-1 ">
          <div className="col-1-mb-4 mr-1 ">
            <i className="fa fa-black-tie  fa-2x text-info  border  p-2 bg-light" />
          </div>
          <div className="col-8  align-content-end m-auto">
            <div className="h6 lead font-weight-light">{profile.bay}</div>
            <div className="h6 text-muted mb-0 font-weight-light">
              {profile.box}
            </div>
          </div>
          <div className="div col-1 ml-auto">
            <Link to={`/stock/${profile._id}`}>
              <i
                // onClick={() => this.onStockClick(profile._id)}
                className="far fa-edit text-primary"
                style={{ cursor: 'pointer' }}
              />
            </Link>
          </div>
        </div>
      </div>
    ));
    // Big & Middle screen only -- TABLE
    const stockBig = profiles.map(profile => (
      // <tbody key={profile._id} style={{ backgroundColor: 'none' }}>
      <tr key={profile._id}>
        {/* <th /> */}
        {/* <td>{profile._id}</td> */}
        <td>{profile.bay}</td>
        <td>{profile.box}</td>
        <td>{profile.row}</td>
        <td>{profile.column}</td>
        <td>{profile.depth}</td>
        <td>{profile.side}</td>
        <td>{profile.well}</td>
        <td>{profile.box}</td>
        <td>{profile.sample}</td>
        <td>{profile.status}</td>

        <td className="mr-auto">
          <Link to={`/stock/${profile._id}`}>
            <i
              // onClick={() => this.onStockClick(profile._id)}
              className="far fa-edit text-primary"
              style={{ cursor: 'pointer' }}
            />
          </Link>
        </td>
      </tr>
      // </tbody>
    ));

    return (
      <div>
        {/* <h4 className="mb-4">Experience Credentials</h4> */}
        <div className=" d-md-none">{stockSmall}</div>
        <table className="table d-none d-md-table table-striped table-bordered">
          <thead className="">
            <tr>
              {/* <th scope="col">Id</th> */}
              <th scope="col">BAY</th>
              <th scope="col">BOX</th>
              <th scope="col">ROW</th>
              <th scope="col">COLUMN</th>
              <th scope="col">DEPTH</th>
              <th scope="col">SIDE</th>
              <th scope="col">WELL NUMBER</th>
              <th scope="col">BOX NUMBER</th>
              <th scope="col">TYPE OF SAMPLE</th>
              <th scope="col">Status</th>
              <th />
            </tr>
          </thead>
          <tbody>{stockBig}</tbody>
        </table>
        {/* <div className=" d-md-none">{stockSmall}</div> */}
        {/* <div>{stockSmall}</div> */}
      </div>
    );
  }
}

export default connect(
  null,
  { getProfileById }
)(StockItem);
