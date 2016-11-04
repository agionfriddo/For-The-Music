import axios from 'axios'

// -------------- CONSTANTS
const SET_EVENTS = 'SET_EVENTS'


// -------------- SYNC ACTION CREATORS
export const setEvents = eventsList => ({type: SET_EVENTS, eventsList})


// -------------- ASYNC ACTION CREATORS
export const fetchAllEvents = dispatch => {
  axios.get('/api/events')
    .then(res => dispatch(setEvents(res.data)))
}


// -------------- REDUCER
const initialEvent = {
  id: 0,
  date: '',
  ticketPrice: '',
  artists:[{name: ''}, {name: ''}],
  venue: {name: ''}
}

const eventListInitialState = [initialEvent]

const reducer = (state = eventListInitialState, action) => {
  switch(action.type) {
    case SET_EVENTS:
      return action.eventsList
  default: return state
  }
}

export default reducer
