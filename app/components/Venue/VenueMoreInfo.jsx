import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class VenueMoreInfo extends Component {
  constructor() {
    super()
  }

  render() {
    console.log(this.props)
    const currentVenue = this.props.venuesList.filter(venue => venue.id === Number(this.props.id))[0]
    if(!currentVenue || currentVenue.name === '') return null;
    console.log(currentVenue)
    return(
        <div>
          <div className="col-md-4">
            <img src={currentVenue.imageurl} className="img-responsive" />
          </div>
          <div className="col-md-8">
            <h1>{currentVenue.name}</h1>
            <h4>{currentVenue.address}</h4>
            <p>{currentVenue.description}</p>
          </div>
        </div>
    )
  }
}


const mapStateToProps = ({venuesList}) => ({
  venuesList
})

const venueMoreInfoContainer = connect(mapStateToProps)(VenueMoreInfo)
export default venueMoreInfoContainer
