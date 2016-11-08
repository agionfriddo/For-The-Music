import React, { Component } from 'react';
import EventItemComponent from './event-item';
import { connect } from 'react-redux';

class EventList extends Component {

  render() {
    let { eventsList, filter } = this.props
    /*eventsList = eventsList.filter(event => event.artists[0].name.toLowerCase().includes(filter.toLowerCase()) ||
                                              event.artists[1].name.toLowerCase().includes(filter.toLowerCase()) ||
                                              event.venue.name.toLowerCase().includes(filter.toLowerCase())) */

    eventsList = eventsList.filter(function (event) {
      let artistArray = event.artists;
      while( artistArray.length > 0) {
        let artist = artistArray.shift()
        if (artist.name.toLowerCase().includes(filter.toLowerCase()))
          return true;
      }
      if (event.venue.name.toLowerCase().includes(filter.toLowerCase()))
          return true;
      else
        return false;
    })

    return (
      <div>
            <h3>Events</h3>
            <div className="list-group">
            {
              eventsList.length > 0
							  ? eventsList.map(event => (
               		<div key={event.id} className="list-group-item">
                 		<EventItemComponent  event={event}/>
                	</div>)
                )
              : <div> No events are available</div>
            }
            </div>
        </div>
    )
  }
}
const mapStateToProps = state => ({eventsList: state.eventsList, filter: state.filter})


export default connect(mapStateToProps)(EventList)
