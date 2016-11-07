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
import EventList from './components/event-list'
import CartComponent from './components/Cart'
import { fetchAllEvents } from './reducers/events'
import ArtistList from './components/artist-list'
import { fetchAllArtists } from './reducers/artists'
import SignUp from './components/sign-up'
import MyAccount from './components/my-account'
import VenueList from './components/venue-list'
import { fetchAllVenues } from './reducers/venues'

// on enter hook for /eventlist, /cart, /artistlist, and /venuelist
const onEventEnter = function() {
  store.dispatch(fetchAllEvents)
}
const onCartEnter = function() {
  store.dispatch(fetchCurrentTickets)
}
const onArtistEnter = function() {
  store.dispatch(fetchAllArtists)
}
const onVenueEnter = function() {
  store.dispatch(fetchAllVenues)
}


render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <IndexRedirect to="/eventlist" />
        <Route path="/jokes" component={Jokes} />
        <Route path="/eventlist" component={EventList} onEnter={onEventEnter} />
        <Route path="/artistlist" component={ ArtistList } onEnter={ onArtistEnter }/>
        <Route path="/venuelist" component= { VenueList } onEnter={ onVenueEnter }/>
        <Route path="/cart" component={CartComponent} />
        <Route path="/signup" component={SignUp} />
        <Route path="/myaccount" component={MyAccount} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
