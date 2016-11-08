import React, { Component } from 'react';
import EventItemComponent from './event-item';
import { connect } from 'react-redux';

class EventList extends Component {

  render() {
    let { eventsList, filter } = this.props
    let artistNames = []
    eventsList.forEach(event => event.artists.forEach(artist => artistNames.push(artist.name)))
    console.log(artistNames)
    eventsList = eventsList.filter(event => event.artists[0].name.includes(filter) || event.artists[1].name.includes(filter) || event.venue.name.includes(filter))

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
