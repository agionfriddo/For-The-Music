import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  eventsList: require('./events').default
})

export default rootReducer
