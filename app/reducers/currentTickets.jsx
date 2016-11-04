import axios from 'axios'

// -------------- CONSTANTS
const GET_CURRENT_TICKETS = 'GET_CURRENT_TICKETS'


// -------------- SYNC ACTION CREATORS
export const getcurrentTickets = currentTickets => ({type: GET_CURRENT_TICKETS, currentTickets})


// -------------- ASYNC ACTION CREATORS
export const fetchCurrentTickets = (dispatch, getState) => {
  axios.get('/api/tickets')
    .then(tickets => {
      let filteredTickets = tickets.data.filter(ticket => ticket.order_id === getState().currentOrder.id)
      dispatch(setCurrentTickets(tickets))
    })
}


// -------------- REDUCER


const initialTickets = []

const reducer = (state = initialTickets, action) => {
  switch(action.type) {
  case GET_CURRENT_TICKETS:
    return action.currentTickets
  }
  return state
}

export default reducer
