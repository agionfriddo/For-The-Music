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
		let thisMoment = moment(UTCDateString, moment.ISO_8601);

    return thisMoment;
	}



    render() {
      const { ticket } = this.props
      console.log('ticket', this)

      var appendedArtists = `${ticket.event.artists[0].name} & ${ticket.event.artists[1].name}`

      appendedArtists.trim();

      let thisDate = this.transformedDate(ticket.event.date)
      let dayOfWeek = thisDate.format('dddd');
      let time = thisDate.format('LT');
      let month = thisDate.format('MMM');
      let dayOfMonth = thisDate.format('DD');
      let year = thisDate.format('YYYY');


      /*Available data in the renderfunction:
        ticket.event.venue.imageurl
        ticket.event.artists[0,1].name
        ticket.event.venue.name
        ticket.event.ticketPrice
        ticket.event.venue.address
        ticket.event.date

        delete'butt'on: onClick={() => this.props.deleteDBTicket(ticket.id)}
      */
      return (
				<div className="ticketContainer">
				<div className="btn btn-danger ticketDelete" onClick={()=>this.props.deleteDBTicket(ticket.id)}>
					<span className="glyphicon glyphicon-remove"></span>
				</div>
        <svg
         xmlnsDc="http://purl.org/dc/elements/1.1/"
         xmlnsCc="http://creativecommons.org/ns#"
         xmlnsRdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlnsSvg="http://www.w3.org/2000/svg"
          xmlns="http://www.w3.org/2000/svg"
         xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="svg2"
          viewBox="0 0 1321.0176 648.82592"
          height="100%"
          width="100%">
          <defs
            id="defs4">
            <linearGradient
              id="linearGradient4202">
              <stop
                id="stop4204"
                offset="0"
                style={{stopColor:'#e6e6e6',stopOpacity:'1'}} />
              <stop
                id="stop4206"
                offset="1"
                style={{stopColor:'#e6e6e6',stopOpacity:'0'}} />
            </linearGradient>
            <linearGradient
              gradientTransform="matrix(0.88069444,0,0,1.0012263,673.29655,-220.93149)"
              gradientUnits="userSpaceOnUse"
              y2="858.31952"
              x2="834.01044"
              y1="598.97394"
              x1="158.59264"
              id="linearGradient4208"
             xlinkHref="#linearGradient4202" />
            <clipPath
              id="clipPath4254"
              clipPathUnits="userSpaceOnUse">
              <rect
                style={{opacity:'1',fill:'url(#linearGradient4258)',fillOpacity:'1',stroke:'#000000',strokeWidth:'12.79300022',strokeMiterlimit:'4',strokeDasharray:'none',strokeOpacity:'1'}}
                id="rect4256"
                width="1486.3325"
                height="636.03308"
                x="-866.19202"
                y="307.89297" />
            </clipPath>
            <linearGradient
              y2="858.31952"
              x2="834.01044"
              y1="598.97394"
              x1="158.59264"
              gradientUnits="userSpaceOnUse"
              id="linearGradient4258"
             xlinkHref="#linearGradient4202" />
          </defs>
          <g
            transform="translate(95.560459,-81.332715)"
            id="layer1">
            <image
              transform="translate(598.92034,-220.1639)"
              clip-path="url(#clipPath4254)"
              width="958.64008"
              height="631.5152"
              preserveAspectRatio="none"
              src={ticket.event.venue.imageurl}
              id="image4146"
              x="-234.53607"
              y="311.14636" />
            <rect
              y="87.339088"
              x="-89.553963"
              height="636.81305"
              width="1309.0048"
              id="rect4136"
              style={{opacity:'1',fill:'url(#linearGradient4208)',fillOpacity:'1',stroke:'#000000',strokeWidth:'12.01299191',strokeMiterlimit:'4',strokeDasharray:'none',strokeOpacity:'1'}} />
            <g
              id="g3471">
              <text
               xmlSpace="preserve"
                style={{fontStyle:'normal',fontWeight:'normal',fontSize:'74.76556396px',lineHeight:'125%',fontFamily:'sans-serif',letterSpacing:'0px',wordSpacing:'0px',fill:'#000000',fillOpacity:'1',stroke:'none',strokeWidth:'1px',strokeLinecap:'butt',strokeLinejoin:'miter',strokeOpacity:'1'}}
                x="129.80888"
                y="220.44914"
                id="text4218"><tspan
                  id="tspan4220"
                  x="129.80888"
                  y="220.44914">{appendedArtists}</tspan></text>
              <text
               xmlSpace="preserve"
                style={{fontStyle:'normal',fontWeight:'normal',fontSize:'41.60047531px',lineHeight:'125%',fontFamily:'sans-serif',letterSpacing:'0px',wordSpacing:'0px',fill:'#000000',fillOpacity:'1',stroke:'none',strokeWidth:'1px',strokeLinecap:'butt',strokeLinejoin:'miter',strokeOpacity:'1'}}
                x="133.06386"
                y="282.552"
                id="text4222"><tspan
                  id="tspan4224"
                  x="133.06386"
                  y="282.552">{ticket.event.venue.name}</tspan></text>
              <text
                id="text4230"
                y="337.92746"
                x="132.75218"
                style={{fontStyle:'normal',fontWeight:'normal',fontSize:'40px',lineHeight:'125%',fontFamily:'sans-serif',letterSpacing:'0px',wordSpacing:'0px',fill:'#000000',fillOpacity:'1',stroke:'none',strokeWidth:'1px',strokeLinecap:'butt',strokeLinejoin:'miter',strokeOpacity:'1'}}
               xmlSpace="preserve"><tspan
                  y="337.92746"
                  x="132.75218"
                  id="tspan4232">{ticket.event.venue.address}</tspan></text>
            </g>
            <path
              id="path4250"
              d="m 88.32076,93.34339 0,621.30981"
              style={{fill:'none',fillRule:'evenodd',stroke:'#000000',strokeWidth:'12',strokeLinecap:'butt',strokeLinejoin:'miter',strokeMiterlimit:'4',strokeDasharray:'none',strokeOpacity:'1'}} />
            <g
              transform="translate(0,10.555411)"
              id="g3485">
              <text
                id="text4242"
                y="-8.4792576"
                x="-684.19049"
                style={{fontStyle:'normal',fontWeight:'normal',fontSize:'40.69391251px',lineHeight:'125%',fontFamily:'sans-serif',letterSpacing:'0px',wordSpacing:'0px',fill:'#000000',fillOpacity:'1',stroke:'none',strokeWidth:'1px',strokeLinecap:'butt',strokeLinejoin:'miter',strokeOpacity:'1'}}
               xmlSpace="preserve"
                transform="matrix(0,-1,1,0,0,0)"><tspan
                  y="-8.4792576"
                  x="-684.19049"
                  id="tspan4244">{appendedArtists}</tspan></text>
              <g
                id="g3479"
                transform="translate(0,-6.3858748)">
                <text
                  transform="matrix(0,-1,1,0,0,0)"
                 xmlSpace="preserve"
                  style={{fontStyle:'normal',fontWeight:'normal',fontSize:'25.42613983px',lineHeight:'125%',fontFamily:'sans-serif',letterSpacing:'0px',wordSpacing:'0px',fill:'#000000',fillOpacity:'1',stroke:'none',strokeWidth:'1px',strokeLinecap:'butt',strokeLinejoin:'miter',strokeOpacity:'1'}}
                  x="-657.68896"
                  y="31.745901"
                  id="text4246"><tspan
                    id="tspan4248"
                    x="-657.68896"
                    y="31.745901">{ticket.event.venue.name}</tspan></text>
                <text
                  id="text4268"
                  y="31.745901"
                  x="-375.68893"
                  style={{fontStyle:'normal',fontWeight:'normal',fontSize:'25.42613983px',lineHeight:'125%',fontFamily:'sans-serif',letterSpacing:'0px',wordSpacing:'0px',fill:'#000000',fillOpacity:'1',stroke:'none',strokeWidth:'1px',strokeLinecap:'butt',strokeLinejoin:'miter',strokeOpacity:'1'}}
                 xmlSpace="preserve"
                  transform="matrix(0,-1,1,0,0,0)"><tspan
                    y="31.745901"
                    x="-375.68893"
                    id="tspan4270">New York City</tspan></text>
              </g>
            </g>
            <g
              id="g3459">
              <text
               xmlSpace="preserve"
                style={{fontStyle:'normal',fontWeight:'normal',fontSize:'72.08903503px',lineHeight:'125%',fontFamily:'sans-serif',letterSpacing:'0px',wordSpacing:'0px',fill:'#000000',fillOpacity:'1',stroke:'none',strokeWidth:'1px',strokeLinecap:'butt',strokeLinejoin:'miter',strokeOpacity:'1'}}
                x="637.42072"
                y="664.04364"
                id="text4210"><tspan
                  id="tspan4212"
                  x="637.42072"
                  y="664.04364">${ticket.event.ticketPrice}</tspan></text>
              <text
               xmlSpace="preserve"
                style={{fontStyle:'normal',fontWeight:'normal',fontSize:'37.91160583px',lineHeight:'125%',fontFamily:'sans-serif',letterSpacing:'0px',wordSpacing:'0px',fill:'#000000',fillOpacity:'1',stroke:'none',strokeWidth:'1px',strokeLinecap:'butt',strokeLinejoin:'miter',strokeOpacity:'1'}}
                x="704.25037"
                y="594.51556"
                id="text4214"><tspan
                  id="tspan4216"
                  x="704.25037"
                  y="594.51556">TOTAL</tspan></text>
              <text
               xmlSpace="preserve"
                style={{fontStyle:'normal',fontWeight:'normal',fontSize:'60.27750778px',lineHeight:'125%',fontFamily:'sans-serif',letterSpacing:'0px',wordSpacing:'0px',fill:'#000000',fillOpacity:'1',stroke:'none',strokeWidth:'1px',strokeLinecap:'butt',strokeLinejoin:'miter',strokeOpacity:'1'}}
                x="637.48877"
                y="435.39597"
                id="text4272"><tspan
                  id="tspan4274"
                  x="637.48877"
                  y="435.39597">{dayOfWeek}</tspan></text>
              <text
               xmlSpace="preserve"
                style={{fontStyle:'normal',fontWeight:'normal',fontSize:'60.27750778px',lineHeight:'125%',fontFamily:'sans-serif',letterSpacing:'0px',wordSpacing:'0px',fill:'#000000',fillOpacity:'1',stroke:'none',strokeWidth:'1px',strokeLinecap:'butt',strokeLinejoin:'miter',strokeOpacity:'1'}}
                x="639.31354"
                y="499.01602"
                id="text4276"><tspan
                  id="tspan4278"
                  x="639.31354"
                  y="499.01602">{time}</tspan></text>
              <path
                id="path4280"
                d="m 621.89219,381.74548 0,307.84071"
                style={{fill:'none',fillRule:'evenodd',stroke:'#666666',strokeWidth:'2',strokeLinecap:'butt',strokeLinejoin:'miter',strokeMiterlimit:'4',strokeDasharray:'none',strokeOpacity:'1'}} />
              <path
                style={{fill:'none',fillRule:'evenodd',stroke:'#666666',strokeWidth:'1.87159228',strokeLinecap:'butt',strokeLinejoin:'miter',strokeMiterlimit:'4',strokeDasharray:'none',strokeOpacity:'1'}}
                d="m 915.55237,533.12381 -269.58053,0"
                id="path4282" />
            </g>
            <g
              transform="translate(-23.747701,-19.789737)"
              id="g3451">
              <text
               xmlSpace="preserve"
                style={{fontStyle:'normal',fontWeight:'normal',fontSize:'57.60102844px',lineHeight:'125%',fontFamily:'sans-serif',letterSpacing:'0px',wordSpacing:'0px',fill:'#000000',fillOpacity:'1',stroke:'none',strokeWidth:'1px',strokeLinecap:'butt',strokeLinejoin:'miter',strokeOpacity:'1'}}
                x="245.85197"
                y="480.62564"
                id="text4284"><tspan
                  id="tspan4286"
                  x="245.85197"
                  y="480.62564">{month}</tspan></text>
              <text
               xmlSpace="preserve"
                style={{fontStyle:'normal',fontWeight:'normal',fontSize:'127.8298111px',lineHeight:'125%',fontFamily:'sans-serif',letterSpacing:'0px',wordSpacing:'0px',fill:'#000000',fillOpacity:'1',stroke:'none',strokeWidth:'1px',strokeLinecap:'butt',strokeLinejoin:'miter',strokeOpacity:'1'}}
                x="230.02422"
                y="588.2879"
                id="text4288"><tspan
                  id="tspan4290"
                  x="230.02422"
                  y="588.2879">{dayOfMonth}</tspan></text>
              <text
               xmlSpace="preserve"
                style={{fontStyle:'normal',fontWeight:'normal',fontSize:'57.60102844px',lineHeight:'125%',fontFamily:'sans-serif',letterSpacing:'0px',wordSpacing:'0px',fill:'#000000',fillOpacity:'1',stroke:'none',strokeWidth:'1px',strokeLinecap:'butt',strokeLinejoin:'miter',strokeOpacity:'1'}}
                x="235.57732"
                y="647.89392"
                id="text4292"><tspan
                  id="tspan4294"
                  x="235.57732"
                  y="647.89392">{year}</tspan></text>
            </g>
            <text
              transform="matrix(0,1,-1,0,0,0)"
             xmlSpace="preserve"
              style={{fontStyle:'normal',fontWeight:'normal',fontSize:'178.304245px',lineHeight:'125%',fontFamily:'sans-serif',letterSpacing:'0px',wordSpacing:'0px',fill:'#000000',fillOpacity:'1',stroke:'none',strokeWidth:'1px',strokeLinecap:'butt',strokeLinejoin:'miter',strokeOpacity:'1'}}
              x="364.30975"
              y="-464.08301"
              id="text3416"><tspan
                id="tspan3418"
                x="364.30975"
                y="-464.08301"
                style={{fontStyle:'normal',fontVariant:'normal',fontWeight:'normal',fontStretch:'normal',fontSize:'178.30426025px',lineHeight:'125%',textAlign:'start',writingMode:'lr-tb',textAnchor:'start'}}>{ticket.id}</tspan></text>
          </g>
        </svg>
	</div>





      )
    }
}

const mapDispatchToProps = {deleteDBTicket}
const mapStateToProps = (state, ownProps) => ({ticket:' ownProps.ticket'})


let CartItemContainer = connect(null, mapDispatchToProps)(CartItem)

export default CartItemContainer

