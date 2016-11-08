import React, { Component } from 'react';
import { Link } from 'react-router';
import { postCurrentOrder } from '../reducers/currentOrder.jsx';
import { connect } from 'react-redux'
var moment = require('moment');

class EventItem extends Component {
  constructor(props) {
    super(props)
		this.transformedDate = this.transformedDate.bind(this);
  }
  transformedDate() {
		if(this.props.event.date === ""){ return "" };
		let thisMoment = moment(this.props.event.date, moment.ISO_8601);
   	return thisMoment.format('LLLL');
  }
  renderImage() {
    if(!location.href.includes('venues')) {
      return (
        <div className="col-md-4">
          <img width="250" src={this.props.event.venue.imageurl} />
        </div>
      )
    } else return null
  }

    render() {
      console.log("THIS YO", this)
			let thisEvent = this.props.event
			let thisVenue = this.props.event.venue
			let artistOne = thisEvent.artists[0];
			let artistTwo = thisEvent.artists[1];
      return (
        <div className="row" id="EventItemComponent">
          {this.renderImage()}
          <div className="col-md-6">
            <h4><Link to={`/artists/${artistOne.id}`}> {artistOne.name}</Link> & <Link to={`/artists/${artistTwo.id}`}> {artistTwo.name} </Link> @ <Link to={`/venues/${thisVenue.id}`}>{thisVenue.name}</Link></h4>
            <p>{this.transformedDate()}</p>
            <p>Price: ${this.props.event.ticketPrice}</p>
          </div>
          <div className="col-md-2">
            <div className="btn btn-primary" onClick={() => this.props.postCurrentOrder(
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
