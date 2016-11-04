import React, { Component } from 'react';
import { postCurrentOrder } from '../reducers/currentOrder.jsx';
import { connect } from 'react-redux'

class EventItem extends Component {
  constructor() {
    super()
  }
  transformedDate() {
    const eventdate = Date.parse(this.props.event.date)
    let utcSeconds = eventdate;
    let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(utcSeconds);
    return d.toString();
  }



    render() {
      console.log('PROPS', this.props.event.artists[0].name)
      return (
        <div className="row">
          <div className="col-md-4">
            <img height="100" width="250" src={this.props.event.venue.imageurl} />
          </div>
          <div className="col-md-6">
            <h4>{this.props.event.artists[0].name} & {this.props.event.artists[1].name} @ {this.props.event.venue.name}</h4>
            <p>Date: {this.transformedDate()}</p>
            <p>Price: ${this.props.event.ticketPrice}</p>
          </div>
          <div className="col-md-2">
            <div className="btn btn-success" onClick={() => this.props.postCurrentOrder(
                this.props.auth,
                this.props.currentOrder.id,
                this.props.event.id)}>BUY NOW</div>
          </div>
        </div>
    )}
}

const mapStateToProps = ({ auth, currentOrder}) => ({
  auth,
  currentOrder
})

const mapDispatchToProps = {postCurrentOrder}

let EventItemComponent = connect(mapStateToProps, mapDispatchToProps)(EventItem)

export default EventItemComponent;
