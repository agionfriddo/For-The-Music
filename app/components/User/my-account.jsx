import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserOrders } from '../../reducers/auth'
import { Link } from 'react-router';
import TicketContainer from '../Event/ticket.jsx';
import ReviewList from '../Review/review-list';
var moment = require('moment');

class MyAccount extends Component {

    componentDidMount(){
      // updateUserOrders
      console.log(this.props.getUserOrders)
      if(this.props.auth) {
        this.props.getUserOrders(this.props.auth.id) }
    }

    render() {
      let name = ''
      let email = ''
      let orders = null
      let reviews = null
      let isAdmin = false
      if (this.props.auth) {
        name = this.props.auth.name
        email = this.props.auth.email
        orders = this.props.auth.orders
        reviews = this.props.auth.reviews
        isAdmin = this.props.auth.isAdmin
      }
      if(orders) {
        orders = orders.filter(order => {
          console.log(order)
          if('in-cart' !== order.status) {return true}
        })
      }

			function tallyPrice(anOrderObj){
	    	let price = 0;
 		  	anOrderObj.tickets && anOrderObj.tickets.forEach(ticket => {
      		price += (Number(ticket.event.ticketPrice))
    		})
				return '$' + String(price.toFixed(2)).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
			}
			function transformedDate(UTCDateString){
				if(UTCDateString === ""){ return "" };
				let thisMoment = moment(UTCDateString, moment.ISO_8601);
    		return thisMoment;
			};
		

		

      return (
        <div className="container">
          <div className='row'>
            <div className="col-md-12">
              <h1>Your Account Information</h1>
              <br/>
              <div>
                <span>Name: {name}  </span>
                <span className="btn btn-warning btn-xs">Edit Name</span>
              </div>
              <br/>
              <div>  
                <span>Email: {email}  </span>
                <span className="btn btn-warning btn-xs">Change Email</span>
              </div>
              <br/>
              <div>
                <div className="btn btn-warning btn-xs">Change Password</div>
              </div>
              {isAdmin ? <Link to="/controlpanel"><div className="btn btn-success">Secret Admin Control Panel</div></Link> : null}
            </div>
          </div>
          <div className='row'>
            <div className="col-md-12">
              <h2>Previous Orders</h2>
              {orders && orders.map(order => {
                return(
                  <div key={order.id}>
                    <div className="col-md-12">
											<div className="row"> 
												<div className="col-md-6 ">
                    			<h3>Order #{order.id}</h3>
													<p>Status: {order.status}</p>
                    			<h4>{order.tickets.length} tickets:</h4>
												</div>
												<div className="col-md-6">
													<h3>Total price: {tallyPrice(order)}</h3>
													<h4>Placed on {transformedDate(order.date).format('dddd, MMMM Do YYYY, h:mm:ss a')}</h4>
												</div>
											</div>
											<div className="listOfTickets row">
												{
													order.tickets.map(ticket => (
														<div key={ticket.id} className="list-group-item col-md-6 ">
															<TicketContainer ticket={ticket} />
														</div>
              						))
												}
											</div>		
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='row'>
            <div className="col-md-12">
              {
                reviews && reviews.length ? <ReviewList reviews={ reviews } /> : <h3>You haven't written any reviews</h3>
              }
            </div>
          </div>
        </div>
      )
    }

}

const mapStateToProps = state => ({auth: state.auth})
const mapDispatchToProps = { getUserOrders }

const MyAccountContainer = connect(mapStateToProps, mapDispatchToProps)(MyAccount)

export default MyAccountContainer


