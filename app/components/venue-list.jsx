import React, { Component } from 'react';
import VenueItemComponent from './venue-item';
import { connect } from 'react-redux';

class VenueList extends Component {
  render () {
    const { venueList } = this.props

    return (
      <div>
        <h3>Venues</h3>
          <div className="list-group">
          {
            venueList && venueList.map(venue => (
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


const mapStateToProps = state => ({venuesList: state.venuesList})

export default connect(mapStateToProps)(VenueList)
