import React from 'react';
import EventList from './event-list';
import SearchBar from '../Nav-SearchBar/SearchBar'

const Events = () => {
    return (
      <div>
        <SearchBar />
        <div className="container">
          <EventList />
        </div>
      </div>
    )
}

export default Events;
