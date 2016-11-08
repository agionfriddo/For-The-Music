import React from 'react';
import VenueList from './venue-list';
import SearchBar from './SearchBar'

const Venues = () => {
    return (
      <div>
        <SearchBar />
        <div className="container">
          <VenueList />
        </div>
      </div>
    )
}

export default Venues;
