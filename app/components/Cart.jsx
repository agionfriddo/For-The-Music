import React from 'react';
import { connect } from 'react-redux'

const Cart = ({ currentTickets }) => {
  console.log("CURRENTTICKETS", currentTickets)
  return (
    <div className='row'>
    <h1>YO IMMA THE CART</h1>
    {
      currentTickets && currentTickets.map(ticket => (
        <div>
          <h2>{ticket.event.artists[0].name}</h2>
          <button>YO THIS COSTS ${ticket.event.ticketPrice}</button>
        </div>
      ))
    }
    </div>
  );
};

const mapStateToProps = ({currentTickets}) => ({
  currentTickets
})

let CartComponent = connect(mapStateToProps)(Cart);

export default CartComponent;
