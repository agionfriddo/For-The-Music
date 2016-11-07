import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ArtistMoreInfo extends Component {
	constructor() {
		super()
	}

	render(){
		let showVideo = function(){
			let availHeight = document.documentElement.clientHeight;
			let availWidth = document.documentElement.clientWidth;
			let videoContainer = document.getElementById("videoContainer");
			let theVideo = document.getElementById("thevideo");
			theVideo.style.width = availWidth / 2 + 'px';
			theVideo.style.height = (parseInt(theVideo.style.width) / 16 * 9) + 'px';
			theVideo.style.marginTop = (availHeight - parseInt(theVideo.style.height))/2 + 'px';
			console.log(theVideo);
			videoContainer.style.visibility = 'visible';
			videoContainer.addEventListener('click', function(){this.style.visibility = 'hidden'})
		}
			
				
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
				<button onClick={showVideo}>YOUTUBE</button>
					<div id='videoContainer'>
						<iframe id="thevideo" src={thisArtist.youtube} frameBorder="0" allowFullScreen></iframe>		
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
