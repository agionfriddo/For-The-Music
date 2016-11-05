import React, { Component } from 'react';
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
		console.log(moment)
		let thisMoment = moment(this.props.event.date, moment.ISO_8601);
   	return thisMoment.format('LLLL');
  }


    render() {
      return (
        <div className="row">
          <div className="col-md-4">
            <img width="250" src={this.props.event.venue.imageurl} />
          </div>
          <div className="col-md-6">
            <h4>{this.props.event.artists[0].name} & {this.props.event.artists[1].name} @ {this.props.event.venue.name}</h4>
            <p>{this.transformedDate()}</p>
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
