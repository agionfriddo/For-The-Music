import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ArtistMoreInfo extends Component {
	constructor() {
		super()
	}

	render(){
		//like maybe this is a little hacky but we have an artist array on the state,
		//and instead of firing an action creator we can just grab active artist from pathname
		const thisArtistId = location.pathname.split('/')[2];
		const thisArtist = this.props.artistsList.filter(anArtist => anArtist.id === Number(thisArtistId))[0]
		if(!thisArtist || thisArtist.name === "" ) return null;
		return (

			<div className="container bio">
			<div className="row">
				<div className="col-md-4">
						<img src={thisArtist.imageurl}/>
				</div>
				<div className="col-md-8">
						
				<h2>{thisArtist.name}</h2>
				<p>{thisArtist.bio}</p>
				<a href={thisArtist.youtube}><button>YOUTUBE</button></a>
					<div className='videoContainer'>
						<iframe width="560" height="315" src={thisArtist.youtube} frameborder="0" allowfullscreen></iframe>		
					</div>
				</div>
			</div>
			</div>
		)	
	}
}

const mapStateToProps = ({artistsList})=>({
	artistsList
})

const moreinfocontainer =  connect(mapStateToProps)(ArtistMoreInfo);
export default moreinfocontainer;
