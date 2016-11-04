import React from 'react'

export default ({ticket}) => (
    <div className='row'>
      <div className="col-md-4">
        <img height="100" width="100" src={ticket.event.venue.imageurl} />
      </div>
      <div className="col-md-6">
        <h6>{ticket.event.artists[0].name} & {ticket.event.artists[1].name} @ {ticket.event.venue.name}</h6>
        <p>Price: ${ticket.event.ticketPrice}</p>
        <p>Address: {ticket.event.venue.address}</p>
      </div>
      <div className="col-md-2">
        <p>Delete Ticket</p>
        <div className="btn btn-danger" onClick={() => {console.log('<3')}}>X</div>
      </div>
    </div>
    )

