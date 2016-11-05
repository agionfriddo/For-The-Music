import axios from 'axios'

// -------------- CONSTANTS
const SET_CURRENT_TICKETS = 'SET_CURRENT_TICKETS'
const DELETE_TICKET = 'DELETE_TICKET'
const CLEAR_CURRENT_ORDER = 'CLEAR_CURRENT_ORDER'


// -------------- SYNC ACTION CREATORS
export const setCurrentTickets = currentTickets => ({type: SET_CURRENT_TICKETS, currentTickets})

export const deleteTicketById = ticketId => ({type: DELETE_TICKET, ticketId})


// -------------- ASYNC ACTION CREATORS
export const fetchCurrentTickets = id => (dispatch, getState) => {
  const { currentOrder } = getState()
  console.log('SWAG', currentOrder)
  axios.get(`/api/orders/${id}/tickets`)
    .then(res => {
      dispatch(setCurrentTickets(res.data))
    })
}

export const deleteDBTicket = id => (dispatch, getState) => {
  axios.put('/api/tickets', {ticketID: id})
    .then(res => {
      dispatch(deleteTicketById(res.data.id))
    })
}




// -------------- REDUCER


const initialTickets = []

const reducer = (state = initialTickets, action) => {
  switch(action.type) {
    case SET_CURRENT_TICKETS:
      return action.currentTickets

    case CLEAR_CURRENT_ORDER:
      return []

    case DELETE_TICKET:
      return state
        .filter(ticket => ticket.id !== action.ticketId)

    default: return state
    }
}

export default reducer
