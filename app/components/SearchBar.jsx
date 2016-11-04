import React, { Component } from 'react';

class SearchBar extends Component {
  constructor() {
    super()
  }

  render() {
    return (
        <div className="control-group" >
          <div className="form-group">
            <label>Search:</label>
            <input type="text" className="form-control" />
          </div>
        </div>
    )
  }

}

export default SearchBar
