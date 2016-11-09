'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes/Jokes'
import Login from './components/Login/Login'
import WhoAmI from './components/Login/WhoAmI'
import Navbar from './components/Nav-SearchBar/Navbar'
import AppContainer from './components/App'
import Events from './components/Event/Events'
import CartComponent from './components/Cart/Cart'
import { fetchAllEvents, fetchEventsByArtist, fetchEventsByVenue } from './reducers/events'
import Artists from './components/Artist/Artists'
import { fetchAllArtists } from './reducers/artists'
import SignUp from './components/User/sign-up'
import MyAccount from './components/User/my-account'
import Artist from './components/Artist/Artist'
import Venue from './components/Venue/Venue'
import ControlPanel from './components/Admin/control-panel'
import ControlPanelArtists from './components/Admin/control-panel-artists'
import ControlPanelEvents from './components/Admin/control-panel-events'
import ControlPanelVenues from './components/Admin/control-panel-venues'
import { fetchFilter } from './reducers/filter'

// on enter hook for /eventlist

import Venues from './components/Venue/Venues'
import { fetchAllVenues, fetchOneVenue } from './reducers/venues'

// on enter hook for /eventlist, /cart, /artistlist, and /venuelist
const onEventListEnter = function() {
  store.dispatch(fetchFilter(''))
  store.dispatch(fetchAllEvents)
}
const onCartEnter = function() {
  store.dispatch(fetchCurrentTickets)
}
const onArtistListEnter = function() {
  store.dispatch(fetchFilter(''))
  store.dispatch(fetchAllArtists)
}
const onArtistEnter = function(artist) {
  store.dispatch(fetchAllArtists)
	store.dispatch(fetchEventsByArtist({id: artist.params.artistId}));
}
const onVenueListEnter = function() {
  store.dispatch(fetchFilter(''))
  store.dispatch(fetchAllVenues)
}
const onVenueEnter = function(venue) {
  store.dispatch(fetchOneVenue({id: venue.params.venueId}))
  store.dispatch(fetchEventsByVenue({id: venue.params.venueId}))
}

const onAppEnter = function() {
  store.dispatch(fetchAllEvents)
  store.dispatch(fetchAllArtists)
  store.dispatch(fetchAllVenues)
}

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer} onEnter={onAppEnter}>
        <IndexRedirect to="/eventlist" />
        <Route path="/jokes" component={Jokes} />
        <Route path="/eventlist" component={Events} onEnter={onEventListEnter} />
        <Route path="/artists/:artistId" component={Artist} onEnter={ onArtistEnter } />
        <Route path="/artistlist" component={ Artists } onEnter={ onArtistListEnter }/>
        <Route path="/venuelist" component= { Venues } onEnter={ onVenueListEnter }/>
        <Route path="/venues/:venueId" component={ Venue } onEnter={ onVenueEnter } />
        <Route path="/cart" component={CartComponent} />
        <Route path="/signup" component={SignUp} />
        <Route path="/myaccount" component={MyAccount} />
        <Route path="/controlpanel" component={ControlPanel}>
          <IndexRedirect to="/controlpanel/artists" />
          <Route path="/controlpanel/artists" component={ControlPanelArtists}/>
          <Route path="/controlpanel/events" component={ControlPanelEvents}/>
          <Route path="/controlpanel/venues" component={ControlPanelVenues}/>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
