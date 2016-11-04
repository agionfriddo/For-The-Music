import React, { Component } from 'react';

class SearchBar extends Component {
  constructor() {
    super()
  }

  render() {
    return (
        <div className="form-group" >
          <label>Search:</label>
          <div className="input-group">
            <input type="text" className="form-control" />
            <span className="input-group-btn">
              <button className="btn btn-success">Go!</button>
            </span>
          </div>
        </div>
    )
  }

}

export default SearchBar
