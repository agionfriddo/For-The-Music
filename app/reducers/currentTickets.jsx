import axios from 'axios'

// -------------- CONSTANTS
const SET_CURRENT_TICKETS = 'SET_CURRENT_TICKETS'


// -------------- SYNC ACTION CREATORS
export const setCurrentTickets = currentTickets => ({type: SET_CURRENT_TICKETS, currentTickets})


// -------------- ASYNC ACTION CREATORS
export const fetchCurrentTickets = id => (dispatch, getState) => {
  const { currentOrder } = getState()
  console.log('SWAG', currentOrder)
  axios.get(`/api/orders/${id}/tickets`)
    .then(res => {
      dispatch(setCurrentTickets(res.data))
    })
}


// -------------- REDUCER


const initialTickets = []

const reducer = (state = initialTickets, action) => {
  switch(action.type) {
    case SET_CURRENT_TICKETS:
      return action.currentTickets

    default: return state
    }
}

export default reducer
