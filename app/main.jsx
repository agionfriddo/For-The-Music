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
import { fetchCurrentTickets } from './reducers/currentTickets'

// on enter hook for /eventlist
const onEventEnter = function() {
  store.dispatch(fetchAllEvents)
}
const onCartEnter = function() {
  store.dispatch(fetchCurrentTickets)
}

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <IndexRedirect to="/eventlist" />
        <Route path="/jokes" component={Jokes} />
        <Route path="/eventlist" component={EventList} onEnter={onEventEnter} />
        <Route path="/cart" component={CartComponent} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
