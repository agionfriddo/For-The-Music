import axios from 'axios'

// ------------- CONSTANTS
const SET_ARTISTS = 'SET_ARTISTS'
const SET_CURRENT_ARTIST = 'SET_CURRENT_ARTIST'


// ------------- SYNC ACTION CREATORS
export const setArtists = artistsList => ({type: SET_ARTISTS, artistsList})
export const setCurrentArtist = artist => ({type: SET_CURRENT_ARTIST, artist})


// ------------- ASYNC ACTION CREATORS
export const fetchAllArtists = dispatch => {
    axios.get('/api/artists')
    .then(res => dispatch(setArtists(res.data)))
}


// ------------- REDUCER

const initialArtist = {
    id: 0,
    name: '',
    imageurl: '',
    genres: []
}

const artistsListInitialState = [initialArtist]

const reducer = (state = artistsListInitialState, action) => {
    switch(action.type) {
        case SET_ARTISTS:
            return action.artistsList
    default: return state
    }
}

export default reducer
