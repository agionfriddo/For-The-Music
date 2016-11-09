import React, {Component} from 'react'
import {addEventOnDatabase} from '../../reducers/events'
import { connect } from 'react-redux'

class ControlPanelEventsComponent extends Component {
  constructor() {
    super()
    this.state = {
      artists: [],
      venue: '',
      date: '',
      initialTickets: 0,
      ticketPrice: 0
    }
    this.updateArtists = this.updateArtists.bind(this);
    this.updateVenue = this.updateVenue.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.updateInitialTickets = this.updateInitialTickets.bind(this);
    this.updateTicketPrice = this.updateTicketPrice.bind(this);
    this.createEvent = this.createEvent.bind(this);
  }
  updateArtists(e) {
    this.setState({artists: [e.target.value]})
  }
  updateVenue(e) {
    this.setState({venue: e.target.value})
  }
  updateDate(e) {
    this.setState({date: e.target.value})
  }
  updateInitialTickets(e) {
    this.setState({initialTickets: e.target.value})
  }
  updateTicketPrice(e) {
    this.setState({ticketPrice: e.target.value})
  }
  createEvent(e) {
    e.preventDefault()
    this.props.addEventOnDatabase(this.state)
  }

    render() {
      return (
          <div className='row'>
            <div className="col-md-12">
              <h3>Add an Event Below</h3>
              <form name="editOrCreateEvent" onSubmit={this.createEvent}>
                <div className="form-group">
                  <label name="artists">Artists:</label>
                  <select className="form-control" onChange={this.updateArtists}>
                  {
                    this.props.artistsList && this.props.artistsList.map(artist => (
                      <option>{artist.name}</option>
                    )
                  )
                  }
                  </select>
                </div>
                <div className="form-group">
                  <label name="venues">Venues:</label>
                  <select className="form-control" onChange={this.updateVenue}>
                  {
                    this.props.venuesList && this.props.venuesList.map(venue => (
                      <option>{venue.name}</option>
                    )
                  )
                  }
                  </select>
                </div>
                  <label name="date">Date:</label>
                  <input type="date" className="form-control" onChange={this.updateDate} />
                <div className="form-group">
                  <label name="initialTickets">Number of Tickets:</label>
                  <input type="text" className="form-control" onChange={this.updateInitialTickets} />
                </div>
                <div className="form-group">
                  <label name="ticketPrice">Price of Ticket:</label>
                  <input type="text" className="form-control" onChange={this.updateTicketPrice} />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
            </div>
          </div>
      )
    }

}
const mapDispatchToProps = { addEventOnDatabase }
const mapStateToProps = ({ venuesList, artistsList }) => ({ venuesList, artistsList })
const ControlPanelEvents = connect(mapStateToProps, mapDispatchToProps)(ControlPanelEventsComponent)

export default ControlPanelEvents;
