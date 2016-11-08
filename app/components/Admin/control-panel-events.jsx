import React, {Component} from 'react'
import {addEventOnDatabase} from '../../reducers/events'
import { connect } from 'react-redux'

class ControlPanelEventsComponent extends Component {
  constructor() {
    super()
    this.createEvent = this.createEvent.bind(this);
  }
  createEvent(event) {
    event.preventDefault();
    console.log(event.target)
    const { addEventOnDatabase } = this.props
    addEventOnDatabase(event.target.value)
  }

    render() {
      return (
          <div className='row'>
            <div className="col-md-12">
              <h3>Add or Edit an Event Below</h3>
              <form name="editOrCreateEvent" onSubmit={this.createEvent}>
                <div className="form-group">
                  <label artists="artists">Artists:</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label name="venue">Venue:</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label name="date">Date:</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="form-group">
                  <label name="initialTickets">Number of Tickets:</label>
                  <input type="number" className="form-control" />
                </div>
                <div className="form-group">
                  <label name="ticketPrice">Price of Ticket:</label>
                  <input type="number" className="form-control" />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
            </div>
          </div>
      )
    }

}
const mapDispatchToProps = { addEventOnDatabase }
const ControlPanelEvents = connect(null, mapDispatchToProps)(ControlPanelEventsComponent)

export default ControlPanelEvents;
