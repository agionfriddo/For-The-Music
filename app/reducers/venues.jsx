import axios from 'axios'

// ------------- CONSTANTS
const SET_VENUES = 'SET_VENUES'


// ------------- SYNC ACTION CREATORS
export const setVenues = venuesList => ({type: SET_VENUES, venuesList})


// ------------- ASYNC ACTION CREATORS
export const fetchAllVenues = dispatch => {
    axios.get('/api/venues')
    .then(res => dispatch(setVenues(res.data)))
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
    default: return state
    }
}

export default reducer
