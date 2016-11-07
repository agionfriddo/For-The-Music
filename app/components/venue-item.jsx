import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class VenueItem extends Component {
  constructor() {
    super()
  }

  render() {
    const venueObj = this.props.venues
    return (
      <div className="row">
        <div className="col-md-4">
          <img width="250" src={ venueObj.imageurl }/>
        </div>
        <div className="col-md-6">
          <h4>{ venueObj.name }</h4>
          <p>{ venueObj.address }</p>
        </div>
        <div className= "col-md-2">
          <div className="btn btn-success">SEE VENUE PAGE</div>
        </div>
      </div>
    )
  }
}
