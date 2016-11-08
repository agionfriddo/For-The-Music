import React from 'react';
import ArtistList from './artist-list';
import SearchBar from './SearchBar'

const Artists = () => {
    return (
      <div>
        <SearchBar />
        <div className="container">
          <ArtistList />
        </div>
      </div>
    )
}

export default Artists;
