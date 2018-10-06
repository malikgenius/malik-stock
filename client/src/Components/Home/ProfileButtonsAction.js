import React from 'react';
import { Link } from 'react-router-dom';

// d-none will hide element on extra small screen xs ... we will hide text on extra small screen
// d-md-block will show on mid screen and d-none will not show on small or extra small
const ProfileButtonsAction = () => {
  return (
    <div className="  mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fa fa-wrench mr-2 text-info d-none d-block" />{' '}
        {/* <i className="fa fa-user-circle text-info mr-1 " /> */}
        Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fa fa-black-tie text-info   d-block" />
        Add Exp
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fa fa-graduation-cap  text-info   d-block" />
        Add Edu
      </Link>
    </div>
  );
};

export default ProfileButtonsAction;

{
  /* <div className="  mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light mr-1">
        <i className="fa fa-wrench mr-2 text-info d-sm-none .d-md-block" />{' '}
        <i className="fa fa-user-circle text-info mr-1 " />
        <span className="d-none d-md-block">Edit Profile</span>
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fa fa-black-tie text-info mr-1" />
        <span className="d-none">Add Experience</span>
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fa fa-graduation-cap  text-info mr-1 " />
        <span className="d-none">Add Education</span>
      </Link>
    </div> */
}
