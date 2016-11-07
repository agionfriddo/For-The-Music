import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchEventsByQuery } from '../reducers/events'

class SearchBarComponent extends Component {
  constructor() {
    super()
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
  }

  onSearchSubmit(event) {
    event.preventDefault();
    const { fetchEventsByQuery } = this.props;
    fetchEventsByQuery(event.target.search.value)
  }

  render() {
    return (
      <div id="searchBar">
        <form className="form-group" onSubmit={this.onSearchSubmit}>
          <div className="input-group" >
            <input
              name="search"
              type="text"
              className="form-control"
              placeholder="Search by Venue or Artist"
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
                <Link to="/artistlist" className="searchShortcut">Artists </Link>
              </div>
              <div className='col-md-4'>
                <a className="searchShortcut">Venues</a>
              </div>
              <div className='col-md-4'>
                <a className="searchShortcut">Events</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }

}

// Container----------------------------------------------------------

const mapDispatchToProps = { fetchEventsByQuery }
const SearchBar = connect(null, mapDispatchToProps)(SearchBarComponent)

export default SearchBar;
