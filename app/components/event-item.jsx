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
			let thisEvent = this.props.event
			let thisVenue = this.props.event.venue 
			let artistsArray = thisEvent.artists;

      return (
        <div className="row" id="EventItemComponent">
          {this.renderImage()}
          <div className="col-md-6">
            <h4>
              {
                artistsArray && artistsArray.map((artist, index, arr) => {
                   return  (arr.length > 1 && index > 0 ) 
                      ? <span key={artist.id}> & <Link to={`/artists/${artist.id}`}>{artist.name}</Link></span>
                      : <Link key={artist.id} to={`/artists/${artist.id}`}>{artist.name}</Link>
                })
              }
              <span key={thisVenue.id}> @ <Link to={`/venues/${thisVenue.id}`}>{thisVenue.name}</Link></span>
            </h4>  
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





  // artistsArray && artistsArray.map(function(artist, index, arr) {
  //                     (arr.length > 1 && index > 0 ) 
  //                       ? <Link to={`/artists/${artist.id}`}>& {artist.name}</Link>
  //                       : <Link to={`/artists/${artist.id}`}> {artist.name}</Link>
  //                 })

            // <h4>
            //   {
            //     artistsArray.length > 0 ?
            //       artistsArray.map(artist => (
            //         <Link to={`/artists/${artist.id}`}> {artist.name}</Link> 
            //       )).join(' &')
            //     : <div> Error loading Artists </div>
            //   }
            //   @
            //   <Link to={`/venues/${thisVenue.id}`}>{thisVenue.name}</Link>
            // </h4>  