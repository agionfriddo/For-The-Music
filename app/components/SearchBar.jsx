import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchFilter } from '../reducers/filter'

class SearchBarComponent extends Component {
  constructor() {
    super()
    this.searchFilter = this.searchFilter.bind(this)
  }

  searchFilter(event) {
    event.preventDefault();
    const { fetchFilter } = this.props;
    fetchFilter(event.target.value)
  }

  render() {
    return (
      <div id="searchBar">
        <form className="form-group" >
          <div className="input-group" >
            <input
              name="search"
              type="text"
              className="form-control"
              placeholder="Search by Venue or Artist"
              onChange={this.searchFilter}
              />
            <span className="input-group-btn">
              <button type="submit" className="btn btn-default">
                Go!
              </button>
            </span>
          </div>
          <div className='container'>
            <div className='row'>
              <div className='col-md-4'>
                <Link to="/artistlist" className="searchShortcut">Artists</Link>
              </div>
              <div className='col-md-4'>
                <Link to="/venuelist" className="searchShortcut">Venues</Link>
              </div>
              <div className='col-md-4'>
                <Link to="/eventlist" className="searchShortcut">Events</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }

}

// Container----------------------------------------------------------

const mapDispatchToProps = { fetchFilter }
const SearchBar = connect(null, mapDispatchToProps)(SearchBarComponent)

export default SearchBar;
