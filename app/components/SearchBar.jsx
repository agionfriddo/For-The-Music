import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEventsByQuery } from '../reducers/events'

class SearchBarComponent extends Component {
  constructor() {
    super()
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
  }

  onSearchSubmit(event) {
    event.preventDefault();
    console.log("YO")
    const { fetchEventsByQuery } = this.props;
    console.log(event.target.search.value)
    fetchEventsByQuery(event.target.search.value)
  }

  render() {
    return (
        <form className="form-group" onSubmit={this.onSearchSubmit}>
          <label>Search:</label>
          <div className="input-group" >
            <input name="search" type="text" className="form-control" />
            <span className="input-group-btn">
              <button type="submit" className="btn btn-success">
                Go!
              </button>
            </span>
          </div>
        </form>
    )
  }

}

// Container----------------------------------------------------------

const mapDispatchToProps = { fetchEventsByQuery }
const SearchBar = connect(null, mapDispatchToProps)(SearchBarComponent)

export default SearchBar;
