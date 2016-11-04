import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  eventsList: require('./events').default,
  currentTickets: require('./currentTickets').default,
  currentOrder: require('./currentOrder').default,
  artistsList: require('./artists').default
})

export default rootReducer