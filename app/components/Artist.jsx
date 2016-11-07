import React, { Component } from 'react';
import EventList from './event-list';
import ArtistMoreInfo from './ArtistMoreInfo'

class Artist extends Component {

  render() {
    return (
    <div>
			<ArtistMoreInfo />
      <EventList />
    </div>
    )
  }
}

export default Artist;
