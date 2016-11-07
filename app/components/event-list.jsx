import React, { Component } from 'react';
import EventItemComponent from './event-item';
import { connect } from 'react-redux';

class EventList extends Component {

  render() {
    const { eventsList } = this.props

    return (
      <div>
          <div className="container">
            <h3>Events</h3>
            <div className="list-group">
            {
              eventsList.length > 0 
							? eventsList.map(event => (
               		<div key={event.id} className="list-group-item">
                 		<EventItemComponent  event={event}/>
                	</div>))
              : <div> No events are available for this artist </div>	
            }
            </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({eventsList: state.eventsList})


export default connect(mapStateToProps)(EventList)
