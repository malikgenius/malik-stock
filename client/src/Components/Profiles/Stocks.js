import React, { Component } from 'react';
import { connect } from 'react-redux';
// Search bar imports
import SpinnerLottie from '../Common/spinnerLottie';
import { getProfiles, getSearchedProfiles } from '../../actions/profileAction';
import StockItem from './StockItem';
import Pagination from 'react-js-pagination';
//Below one is  More famous than react-js-pagination
import ReactPaginate from 'react-paginate';
import SearchBar from '../Common/SearchBar';

class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // search: '',
      // option: '',
      activePage: 1,
      pages: '',
      total: '',
      limit: '',
      page: 1
    };
  }
  componentDidMount = () => {
    this.setState({ page: this.props.profile.page });
    this.props.getProfiles(this.props.profile.page);
  };
  componentWillReceiveProps = nextProps => {
    // this will define which page user was on the last time.
    if (nextProps.profile.page) {
      this.setState({ page: nextProps.profile.page });
    }
    if (nextProps.profile.pages) {
      this.setState({ pages: nextProps.profile.pages });
    }
    if (nextProps.profile.total) {
      this.setState({ total: nextProps.profile.total });
    }
    if (nextProps.profile.limit) {
      this.setState({ limit: nextProps.profile.limit });
    }
  };

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handlePageChange = pageToLoad => {
    // console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageToLoad });
    this.props.getProfiles(pageToLoad);
    // if (pageNumber !== this.state.pages) {
    //   this.setState({ hasMore: true });
    // }
  };

  onSearched = (search, option) => {
    // console.log(formData);
    this.props.getSearchedProfiles(this.state.activePage, search, option);
  };

  render() {
    const { profiles, loading } = this.props.profile;
    // let profileItems;

    // if (profiles === null || loading) {
    //   profileItems = <SpinnerLottie />;
    // } else {
    //   if (profiles.length <= 0) {
    //     profileItems = <h4>No Profiles Found .. </h4>;
    //     // profileItems = profiles.map(profile => (
    //     // <ProfileItem profiles={profiles} />;
    //     // ));
    //   } else {
    //     <StockItem profiles={profiles} />;
    //   }
    // }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Stock Records</h1>
              <p className="lead text-center">Search to get required records</p>
              {/* Searchbar to search the stocks ..  */}

              {/* <SearchBar onSearched={this.onSearched} /> */}
              {/* This will be shown only on Mobile and small screens ... not on Desktop */}
              <div className="container d-md-none">
                <div className="row">
                  <div className="col-md-12">
                    {this.state.total ? (
                      <div className="alert text-muted align-middle  text-center">
                        Total records found{' '}
                        <span className="badge badge-pill badge-info h4">
                          {this.state.total}{' '}
                        </span>
                      </div>
                    ) : (
                      <div className="alert text-muted align-middle  text-center">
                        <span className="badge badge-pill badge-danger h4">
                          0
                        </span>{' '}
                        records found{' '}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* if no stock found we should not load StockItem as its maping through profiles, will generate error  */}
              {profiles !== null ? <StockItem profiles={profiles} /> : ''}
            </div>
          </div>
        </div>

        {/* This will be shown only on middle and big screens ... not on mobile */}
        {this.state.pages === 1 ? (
          <div className="container d-none d-md-block">
            <div className="row">
              <div className="col-4 m-auto">
                {this.state.total ? (
                  <div className="alert text-muted align-middle  text-center">
                    Total records found{' '}
                    <span className="badge badge-pill badge-info h4">
                      {this.state.total}{' '}
                    </span>
                  </div>
                ) : (
                  <div className="alert text-muted align-middle  text-center">
                    <span className="badge badge-pill badge-danger h4">0</span>{' '}
                    records found{' '}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="container d-none d-md-block">
            <div className="row">
              <div className="col-4 m-auto">
                <div>
                  <Pagination
                    className="pagination align-items-center d-sm-flex"
                    hideDisabled
                    prevPageText="prev"
                    nextPageText="next"
                    firstPageText="first"
                    lastPageText="last"
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.limit}
                    totalItemsCount={this.state.total}
                    pageRangeDisplayed="5"
                    onChange={this.handlePageChange}
                  />
                  {/* <ReactPaginate
                    className="pagination align-items-center d-sm-flex"
                    hideDisabled
                    previousLabel="prev"
                    nextLabel="next"
                    firstPageText="first"
                    lastPageText="last"
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.limit}
                    pageCount={this.state.total}
                    pageRangeDisplayed="5"
                    onPageChange={this.handlePageChange}
                  /> */}
                  {this.state.total ? (
                    <div className="alert text-muted align-middle  text-center">
                      Total records found{' '}
                      <span className="badge badge-pill badge-info h4">
                        {this.state.total}{' '}
                      </span>
                      <p className="text-muted">
                        you are on page{' '}
                        <span className="badge badge-pill badge-info h4">
                          {this.state.activePage}{' '}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <div className="alert text-muted align-middle  text-center">
                      <span className="badge badge-pill badge-danger h4">
                        0
                      </span>{' '}
                      records found{' '}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {this.state.pages === 1 ? (
          ''
        ) : (
          <div className="container d-md-none">
            <div className="row">
              <div className="col-4 mr-auto">
                <div>
                  <Pagination
                    // we dont want to see prev next page options on mobile.
                    className="pagination align-items-center d-sm-flex"
                    hideDisabled
                    // prevPageText="prev"
                    // nextPageText="next"
                    // firstPageText="first"
                    // lastPageText="last"
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.limit}
                    totalItemsCount={this.state.total}
                    pageRangeDisplayed={this.state.pages}
                    onChange={this.handlePageChange}
                  />
                  {/* <div className="alert text-info align-middle">
                  Total records found {this.state.total}
                </div> */}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Infite Scroll starts here it will be only on Mobile Phones ..  */}
        {/* <div className="container d-md-none">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
            </div>
          </div>
          <InfiniteScroll
            onScroll={this.handleLoadMore}
            pageStart={0}
            initialLoad={true}
            loadMore={this.handleLoadMore}
            hasMore={this.state.hasMoreItems}
            isReverse={true}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
          >
           
            {profileItems}
          </InfiniteScroll>
          <div>
            <div />
          </div>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.profile
  };
};
export default connect(
  mapStateToProps,
  { getProfiles, getSearchedProfiles }
)(Profiles);
