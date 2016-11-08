import React, { Component } from 'react';
import EventList from '../Event/event-list';
import VenueMoreInfo from './VenueMoreInfo';
import ReviewList from '../Review/review-list';
import { connect } from 'react-redux';

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
              <ReviewList reviews={this.props.venuesList[0].reviews}/>
            </div>
          </div>
      </div>
    )
  }
}

const mapDispatchToProps = ({venuesList}) => ({
  venuesList
})

const VenueContainer = connect(mapDispatchToProps)(Venue);

export default VenueContainer
