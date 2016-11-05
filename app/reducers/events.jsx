import axios from 'axios'

// -------------- CONSTANTS
const SET_EVENTS = 'SET_EVENTS'
const SET_EVENTS_BY_QUERY = 'SET_EVENTS_BY_QUERY'


// -------------- SYNC ACTION CREATORS
export const setEvents = eventsList => ({type: SET_EVENTS, eventsList})
export const setEventsByQuery = eventsList => ({type: SET_EVENTS_BY_QUERY, eventsList})


// -------------- ASYNC ACTION CREATORS
export const fetchAllEvents = dispatch => {
  axios.get('/api/events')
    .then(res => dispatch(setEvents(res.data)))
}

export const fetchEventsByQuery = query => dispatch => {
  axios.get(`api/query?name=${query}`)
  .then(res => {
    console.log("DATA", res.data)
    dispatch(setEventsByQuery(res.data))
  })
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
    case SET_EVENTS_BY_QUERY:
      console.log("REDUCE YO")
      return action.eventsList
  default: return state
  }
}

export default reducer
