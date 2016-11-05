import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCurrentTickets } from '../reducers/currentTickets'
import { checkCurrentOrder, completeCurrentOrder } from '../reducers/currentOrder'
import CartItem from './cart-item'

class CartComponent extends Component {
  componentDidMount() {
    console.log('cart mounted')

    let orderId = this.props.currentOrder.id

    if(orderId) {
      this.props.fetchCurrentTickets(orderId)
    }
    else if(this.props.auth.id){
    	this.props.checkCurrentOrder(this.props.auth.id)
    }
    else {
    	this.props.checkCurrentOrder(0)
    }

	}

    // if not current order, check if there is associated order
    // if current order, get tickets

  componentDidUpdate(prevProps, prevState) {
    let orderId = this.props.currentOrder.id

    if((prevProps.currentOrder.id !== orderId ) && orderId){
      this.props.fetchCurrentTickets(orderId)
    }

  }



  render() {

    const { currentTickets, currentOrder, auth } = this.props

    let price = 0;

    currentTickets.forEach(ticket => {
      price += Number(Number(ticket.event.ticketPrice))
    })

		price = '$' + String(price.toFixed(2)).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

    return (
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
              currentTickets && currentTickets.map(ticket => (
                <div key={ticket.id} className="list-group-item col-md-12">
                  <CartItem ticket={ticket} />
                </div>
              ))
            }
          </div>
        </div>
      </div>

    )
  }
}


const mapStateToProps = ({currentTickets, currentOrder, auth}) => ({
  currentTickets,
  currentOrder,
  auth
})

const mapDispatchToProps = { fetchCurrentTickets, checkCurrentOrder, completeCurrentOrder }

let CartContainer = connect(mapStateToProps, mapDispatchToProps)(CartComponent);

export default CartContainer;
