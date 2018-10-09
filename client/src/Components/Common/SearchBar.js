/* eslint react/prop-types: 0 */
import React from 'react';
import {
  Button,
  InputGroup,
  InputGroupButtonDropdown,
  Input,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
// import "./SearchBar.css";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { getSearchedStocks } from '../../actions/profileAction';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.state = {
      dropdownOpen: false,
      splitButtonOpen: false,
      search: '',
      option: 'bay'
    };
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  }
  // search onChange options..
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  // sending data to Stocks like search and option.
  onSearchClicked = () => {
    // const formData = {
    const search = this.state.search;
    const option = this.state.option;
    // };
    this.props.onSearched(search, option);
    // console.log(formData);
  };

  render() {
    return (
      <div>
        <div style={{ marginTop: 50, marginBottom: 50 }}>
          <InputGroup>
            <InputGroupButtonDropdown
              addonType="append"
              isOpen={this.state.dropdownOpen}
              toggle={this.toggleDropDown}
            >
              <Button
                className="btn btn-outline-info btn-lg"
                onClick={this.onSearchClicked}
              >
                {this.state.option}
              </Button>
              <DropdownToggle split outline info caret />
              <DropdownMenu>
                <DropdownItem
                  value="_id"
                  name="option"
                  onClick={this.onChange}
                  // onClick={this.props.sortByChange}
                >
                  ID
                </DropdownItem>
                {/* <DropdownItem value="department" onClick={this.props.sortByChange}>Department</DropdownItem> */}
                <DropdownItem
                  value="bay"
                  name="option"
                  onClick={this.onChange}
                  // onClick={this.props.searchchange}
                >
                  BAY
                </DropdownItem>
                <DropdownItem
                  value="box"
                  name="option"
                  onClick={this.onChange}
                  // onClick={this.props.searchchange}
                >
                  BOX
                </DropdownItem>
                <DropdownItem
                  value="row"
                  name="option"
                  onClick={this.onChange}
                  // onClick={this.props.searchchange}
                >
                  ROW
                </DropdownItem>
                <DropdownItem
                  value="column"
                  name="option"
                  onClick={this.onChange}
                  // onClick={this.props.searchchange}
                >
                  COLUMN
                </DropdownItem>
              </DropdownMenu>
            </InputGroupButtonDropdown>
            <Input
              name="search"
              className="p-4"
              placeholder="search stock"
              onChange={this.onChange}
              value={this.state.search}
            />
            <div className="input-group-prepend">
              <span
                className="input-group-text btn"
                onClick={this.onSearchClicked}
              >
                <i className="fab fa-searchengin text-info fa-lg" />
              </span>
            </div>
          </InputGroup>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {}
)(withRouter(SearchBar));
// export default SearchBar;
