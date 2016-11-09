import React, { Component } from 'react';
import VenueItemComponent from './venue-item';
import { connect } from 'react-redux';

class VenueList extends Component {
  render () {
    let { venuesList, filter } = this.props
    venuesList = venuesList.filter(venue => venue.name.toLowerCase().includes(filter.toLowerCase()))

    return (
      <div>
        <h2>Venues</h2>
          <div className="list-group">
          {
            venuesList && venuesList.map(venue => (
              <div key={ venue.id } className="list-group-item">
                <VenueItemComponent venue={ venue }/>
              </div>
            )
          )}
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({venuesList: state.venuesList, filter: state.filter})

export default connect(mapStateToProps)(VenueList)
