import React, { Component } from 'react';

class SearchBar extends Component {
  constructor() {
    super()
  }

  render() {
    return (
        <div className="control-group" style={{marginBottom: 20}}>
          <div className="form=group">
            <label for="search">Search:</label>
            <input type="text" className="form-control" />
          </div>
        </div>
    )
  }

}

export default SearchBar
