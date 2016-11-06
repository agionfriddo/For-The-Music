import React, { Component } from 'react';
import { connect } from 'react-redux'
import { checkCurrentOrder, completeCurrentOrder } from '../reducers/currentOrder'
import CartItemContainer from './cart-item'

class CartComponent extends Component {
  componentDidMount() {
    let orderId = this.props.currentOrder ? this.props.currentOrder.id : 0;
    let authId = this.props.auth ? this.props.auth.id : 0;

    // if user logged in, check for an order for that user
    if (authId) {
    	this.props.checkCurrentOrder(this.props.auth.id)
    }
    else {
      // check for an order on the cookie
    	this.props.checkCurrentOrder(0)
    }
	}

  componentDidUpdate(prevProps, prevState) {
    // forces a re-render so tickets will be shown
    if(prevProps.auth !== this.props.auth) {
      this.props.checkCurrentOrder(this.props.auth.id)
    }
  }

  render() {

    const { currentOrder, auth } = this.props

    let price = 0;

    currentOrder.tickets && currentOrder.tickets.forEach(ticket => {
      price += (Number(ticket.event.ticketPrice))
    })

		price = '$' + String(price.toFixed(2)).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

    return (
		<div className='container'>
      <div className='row'>
        <div className='col-md-6'>
          <div className='row'>
            <div className='col-md-12'>
              <h3>Current Cart</h3>
              <h5>Order Number {currentOrder.id}</h5>
              <p>Tickets Included Below:</p>

              <h1>Total Price: {price}</h1>
              {this.props.auth ? <div className="btn btn-success" onClick={() => this.props.completeCurrentOrder(currentOrder.id, auth.id)}>COMPLETE PURCHASE</div> : <div></div>}
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <div className="list-group row">
            {
              currentOrder.tickets && currentOrder.tickets.map(ticket => (
                <div key={ticket.id} className="list-group-item col-md-12">
                  <CartItemContainer ticket={ticket} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
		</div>

    )
  }
}


const mapStateToProps = ({currentOrder, auth}) => ({
  currentOrder,
  auth
})

const mapDispatchToProps = { checkCurrentOrder, completeCurrentOrder }

let CartContainer = connect(mapStateToProps, mapDispatchToProps)(CartComponent);

export default CartContainer;
