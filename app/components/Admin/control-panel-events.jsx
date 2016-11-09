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
      ticketPrice: 0,
      eventId: 0
    }
    this.updateArtists = this.updateArtists.bind(this);
    this.updateVenue = this.updateVenue.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.updateInitialTickets = this.updateInitialTickets.bind(this);
    this.updateTicketPrice = this.updateTicketPrice.bind(this);
    this.updateEventId = this.updateEventId.bind(this);
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
  updateEventId(e) {
    this.setState({eventId: e.target.value})
  }
  createEvent(e) {
    e.preventDefault()
    this.props.addEventOnDatabase(this.state)
  }

    render() {
      return (
          <div className='row' id="editEvent">
            <div className="col-md-6">
              <h3>Add or Edit an Event Below</h3>
              <h4>Please complete the entire form</h4>
              <form name="editOrCreateEvent" onSubmit={this.createEvent}>
                <div className="form-group">
                  <label name="events">Events:</label>
                  <select className="form-control" onChange={this.updateEventId}>
                    <option value="0">Select an Event, Don't Change to Create a New Event</option>
                  {
                    this.props.eventsList && this.props.eventsList.map(event => (
                      <option key={event.id} value={event.id}> Update -- {event.artists[0].name} @ {event.venue.name} -- {(new Date(Date.parse(event.date))).toDateString().slice()}</option>
                    )
                  )
                  }
                  </select>
                </div>
                <div className="form-group">
                  <label name="artists">Artists:</label>
                  <select className="form-control" onChange={this.updateArtists}>
                  <option value="0">Select an Artist</option>
                  {
                    this.props.artistsList && this.props.artistsList.map(artist => (
                      <option key={artist.id}>{artist.name}</option>
                    )
                  )
                  }
                  </select>
                </div>
                <div className="form-group">
                  <label name="venues">Venues:</label>
                  <select className="form-control" onChange={this.updateVenue}>
                  <option value="0">Select a Venue</option>
                  {
                    this.props.venuesList && this.props.venuesList.map(venue => (
                      <option key={venue.id}>{venue.name}</option>
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
            <div className="col-md-6">
              {
                this.props.eventsList && this.props.eventsList.map(event => {
                  if(event.id == this.state.eventId) {
                    return (
                      <div key={event.id}>
                        <div className="row">
                          <div className="col-md-6">
                            <h4>Artist: {event.artists[0].name}</h4>
                            <img src={event.artists[0].imageurl} />
                            <h4>Venue: {event.venue.name}</h4>
                            <img src={event.venue.imageurl} />
                          </div>
                          <div className="col-md-6">
                            <h4>Date: {(new Date(Date.parse(event.date))).toDateString().slice()}</h4>
                            <h4>Initial Tickets: {event.initialTickets}</h4>
                            <h4>Ticket Price: {event.ticketPrice}</h4>
                          </div>
                        </div>
                      </div>
                    )
                  }
                })
              }
            </div>
          </div>
      )
    }

}
const mapDispatchToProps = { addEventOnDatabase }
const mapStateToProps = ({ venuesList, artistsList, eventsList }) => ({ venuesList, artistsList, eventsList })
const ControlPanelEvents = connect(mapStateToProps, mapDispatchToProps)(ControlPanelEventsComponent)

export default ControlPanelEvents;
