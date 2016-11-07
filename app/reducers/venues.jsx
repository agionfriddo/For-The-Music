import axios from 'axios'

// ------------- CONSTANTS
const SET_VENUES = 'SET_VENUES'
const SET_ONE_VENUE = 'SET_ONE_VENUE'


// ------------- SYNC ACTION CREATORS
export const setVenues = venuesList => ({type: SET_VENUES, venuesList})
export const setOneVenue = venue => ({type: SET_ONE_VENUE, venue})


// ------------- ASYNC ACTION CREATORS
export const fetchAllVenues = dispatch => {
    axios.get('/api/venues')
    .then(res => dispatch(setVenues(res.data)))
}
export const fetchOneVenue = venue => dispatch => {
  console.log(venue)
  axios.get(`/api/venues/${venue.id}`)
  .then(res => dispatch(setOneVenue(res.data)))
}


// ------------- REDUCER

const initialVenue = {
    id: 0,
    name: '',
    address: '',
    imageurl: ''
}

const venuesListInitialState = [initialVenue]

const reducer = (state = venuesListInitialState, action) => {
    switch(action.type) {
        case SET_VENUES:
            return action.venuesList
        case SET_ONE_VENUE:
            return [action.venue]
    default: return state
    }
}

export default reducer
