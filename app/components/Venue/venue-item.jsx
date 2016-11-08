import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export default class VenueItem extends Component {
  constructor() {
    super()
  }

  render() {
    const venueObj = this.props.venue
    return (
      <div className="row">
        <div className="col-md-4">
          <img width="250" src={ venueObj.imageurl }/>
        </div>
        <div className="col-md-6">
          <Link to={`/venues/${venueObj.id}`}><h4>{ venueObj.name }</h4></Link>
          <p>{ venueObj.address }</p>
        </div>
        <div className= "col-md-2">
          <Link to={`/venues/${venueObj.id}`}><div className="btn btn-primary">SEE PAGE</div></Link>
        </div>
      </div>
    )
  }
}
