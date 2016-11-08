// ------------- CONSTANTS
const SET_FILTER = 'SET_FILTER'


// ------------- SYNC ACTION CREATORS
export const setFilter = filter => ({type: SET_FILTER, filter})


// ------------- ASYNC ACTION CREATORS
export const fetchFilter = filter => dispatch => {
    dispatch(setFilter(filter))
}


// ------------- REDUCER

const initialArtist = '';

const reducer = (state = initialArtist, action) => {
    switch(action.type) {
        case SET_FILTER:
            return action.filter
    default: return state
    }
}

export default reducer
