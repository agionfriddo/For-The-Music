import React, { Component } from 'react';
import EventItemComponent from './event-item';
import { connect } from 'react-redux';
import SearchBar from './SearchBar'

class EventList extends Component {

  render() {
    const { eventsList } = this.props

    return (
      <div>
          <SearchBar />
          <div className="container">
            <h3>Events</h3>
            <div className="list-group">
            {
              eventsList && eventsList.map(event => (
                <div key={event.id} className="list-group-item">
                  <EventItemComponent  event={event}/>
                </div>
              )
            )}
            </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({eventsList: state.eventsList})


export default connect(mapStateToProps)(EventList)
