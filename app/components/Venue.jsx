import React, { Component } from 'react';
import EventList from './event-list';
import VenueMoreInfo from './VenueMoreInfo';
import ReviewList from './review-list'

class Venue extends Component {
  constructor() {
    super()
  }

  render() {
    console.log("YO BUT PROPS THO", this.props)
    return (
      <div className="container">
        <div className="row">
            <VenueMoreInfo id={this.props.params.venueId}/>
        </div>
          <div className="row">
            <div className="col-md-6">
              <EventList />
            </div>
            <div className="col-md-6">
              <ReviewList />
            </div>
          </div>
      </div>
    )
  }
}

export default Venue
