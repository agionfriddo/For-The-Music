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
import { fetchAllEvents } from './reducers/events'

// on enter hook for /eventlist
const onEventEnter = function() {
  store.dispatch(fetchAllEvents)
}

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <IndexRedirect to="/eventlist" />
        <Route path="/jokes" component={Jokes} />
        <Route path="/eventlist" component={EventList} onEnter={onEventEnter} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
