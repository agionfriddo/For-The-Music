import React, { Component } from 'react';
import EventItem from './event-item'
import { connect } from'react-redux';

class EventList extends Component {

  render() {
    const { eventsList } = this.props

    return (
      <div>
      <h3>Events</h3>
        <div className="list-group">
          {
            eventsList && eventsList.map(event => (
              <div key={event.id} className="list-group-item">
                <EventItem  event={event}/>
              </div>
            )
          )}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({eventsList: state.eventsList})


export default connect(mapStateToProps)(EventList)
