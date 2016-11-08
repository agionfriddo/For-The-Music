'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import Navbar from './components/Navbar'
import AppContainer from './components/App'
import Events from './components/Events'
import CartComponent from './components/Cart'
import { fetchAllEvents, fetchEventsByArtist, fetchEventsByVenue } from './reducers/events'
import Artists from './components/Artists'
import { fetchAllArtists } from './reducers/artists'
import SignUp from './components/sign-up'
import MyAccount from './components/my-account'
import Artist from './components/Artist'
import Venue from './components/Venue'
import ControlPanel from './components/control-panel'
import ControlPanelArtists from './components/control-panel-artists'
import ControlPanelEvents from './components/control-panel-events'

// on enter hook for /eventlist

import Venues from './components/Venues'
import { fetchAllVenues, fetchOneVenue } from './reducers/venues'

// on enter hook for /eventlist, /cart, /artistlist, and /venuelist
const onEventListEnter = function() {
  store.dispatch(fetchAllEvents)
}
const onCartEnter = function() {
  store.dispatch(fetchCurrentTickets)
}
const onArtistListEnter = function() {
  store.dispatch(fetchAllArtists)
}
const onArtistEnter = function(artist) {
  store.dispatch(fetchAllArtists)
	store.dispatch(fetchEventsByArtist({id: artist.params.artistId}));
}
const onVenueListEnter = function() {
  store.dispatch(fetchAllVenues)
}
const onVenueEnter = function(venue) {
  store.dispatch(fetchOneVenue({id: venue.params.venueId}))
  store.dispatch(fetchEventsByVenue({id: venue.params.venueId}))
}


render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
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
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
