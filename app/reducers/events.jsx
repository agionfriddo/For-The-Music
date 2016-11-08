import axios from 'axios'

// -------------- CONSTANTS
const SET_EVENTS = 'SET_EVENTS'
const SET_EVENTS_BY_QUERY = 'SET_EVENTS_BY_QUERY'
const SET_EVENTS_BY_ARTIST = 'SET_EVENTS_BY_ARTIST'
const SET_EVENTS_BY_VENUE = 'SET_EVENTS_BY_VENUE'
const ADD_EVENT = 'ADD_EVENT'


// -------------- SYNC ACTION CREATORS
export const setEvents = eventsList => ({type: SET_EVENTS, eventsList})
export const setEventsByQuery = eventsList => ({type: SET_EVENTS_BY_QUERY, eventsList})
export const setEventsByArtist = eventsList => ({type: SET_EVENTS_BY_ARTIST, eventsList})
export const setEventsByVenue = eventsList => ({type: SET_EVENTS_BY_VENUE, eventsList})
export const addEvent = event => ({type: ADD_EVENT, event})

// -------------- ASYNC ACTION CREATORS
export const fetchAllEvents = dispatch => {
  axios.get('/api/events')
    .then(res => {
      dispatch(setEvents(res.data))
    })
}

export const fetchEventsByQuery = query => dispatch => {
  axios.get(`api/query?name=${query}`)
  .then(res => {
    dispatch(setEventsByQuery(res.data))
  })
}

export const fetchEventsByArtist = artist => dispatch => {
  axios.get(`/api/artists/${artist.id}/events`)
  .then(res => {
    console.log("DATA", res.data)
    dispatch(setEventsByArtist(res.data))
  })
}

export const fetchEventsByVenue = venue => dispatch => {
  axios.get(`/api/venues/${venue.id}/events`)
  .then(res => {
    console.log("DATA", res.data)
    dispatch(setEventsByVenue(res.data))
  })
}

export const addEventOnDatabase = newEvent => dispatch => {
  axios.post(`/api/events`)
  .then(res => console.log(res.data))
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
      return action.eventsList
    case SET_EVENTS_BY_ARTIST:
      return action.eventsList
    case SET_EVENTS_BY_VENUE:
      return action.eventsList
  default: return state
  }
}

export default reducer
