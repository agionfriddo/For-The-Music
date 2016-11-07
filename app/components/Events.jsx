import React from 'react';
import EventList from './event-list';
import SearchBar from './SearchBar'

const Events = () => {
    return (
      <div>
        <SearchBar />
        <EventList />
      </div>
    )
}

export default Events;
