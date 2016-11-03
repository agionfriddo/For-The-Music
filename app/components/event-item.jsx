import React, { Component } from 'react';

const EventItem = props => {
    const { event } = props

    const eventdate = Date.parse(event.date)
    let utcSeconds = eventdate;
    let d = new Date(0); // The 0 there is the key, which sets the date to the epoch

    d.setUTCSeconds(utcSeconds);

    return (
      <div className="row">
        <div className="col-md-4">
          <img height="100" width="250" src={event.venue.imageurl} />
        </div>
        <div className="col-md-6">
          <h4>{event.artists[0].name} @ {event.venue.name}</h4>
          <p>Date: {d.toString()}</p>
          <p>Price: ${event.ticketPrice}</p>
        </div>
        <div className="col-md-2">
          <div className="btn btn-success">BUY NOW</div>
        </div>
      </div>
    )
}

export default EventItem


