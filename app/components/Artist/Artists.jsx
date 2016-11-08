import React from 'react';
import ArtistList from './artist-list';
import SearchBar from '../Nav-SearchBar/SearchBar'


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
