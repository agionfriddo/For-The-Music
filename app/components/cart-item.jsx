import React, { Component } from 'react';
import { deleteDBTicket } from '../reducers/currentTickets.jsx';
import { connect } from 'react-redux'
var moment = require('moment');


class CartItem extends Component {

	constructor(){
		super();
		this.transformedData = this.transformedDate.bind(this);
	}

	transformedDate(UTCDateString){
		if(UTCDateString === ""){ return "" };
		console.log(moment)
		let thisMoment = moment(UTCDateString, moment.ISO_8601);	
   	return thisMoment.format('LLLL');
	}
	


    render() {
      const { ticket } = this.props
      console.log('ticket', this)

      return (
        <div className='row'>
          <div className="col-md-4">
            <img height="100" width="100" src={ticket.event.venue.imageurl} />
          </div>
          <div className="col-md-6">
            <h6>{ticket.event.artists[0].name} & {ticket.event.artists[1].name} @ {ticket.event.venue.name}</h6>
            <p>Price: ${ticket.event.ticketPrice}</p>
            <p>Address: {ticket.event.venue.address}</p>
						<p>{this.transformedData(ticket.event.date)}</p>
          </div>
          <div className="col-md-2">
            <p>Delete Ticket</p>
            <div className="btn btn-danger" onClick={() => this.props.deleteDBTicket(ticket.id)}>X</div>
          </div>
        </div>
      )
    }
}

const mapDispatchToProps = {deleteDBTicket}
const mapStateToProps = (state, ownProps) => ({ticket: ownProps.ticket})


let CartItemContainer = connect(null, mapDispatchToProps)(CartItem)

export default CartItemContainer

