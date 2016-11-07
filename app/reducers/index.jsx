import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  eventsList: require('./events').default,
  currentOrder: require('./currentOrder').default,
  artistsList: require('./artists').default,
  venuesList: require('./venues').default
})

export default rootReducer
