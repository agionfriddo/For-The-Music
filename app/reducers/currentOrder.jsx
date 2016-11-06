import axios from 'axios'

// -------------- CONSTANTS
const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER'
const CLEAR_CURRENT_ORDER = 'CLEAR_CURRENT_ORDER'
const REMOVE_ORDER_TICKET = 'REMOVE_ORDER_TICKET'

const initialOrder = {
  id: null,
  date: '',
  ticketPrice: '',
  artists:[{name: ''}],
  venue: {name: ''}
}


// -------------- SYNC ACTION CREATORS
export const setCurrentOrder = currentOrder => ({type: SET_CURRENT_ORDER, currentOrder})
export const clearCurrentOrder = () => ({type: CLEAR_CURRENT_ORDER})

export const removeOrderTicket = ticketId => ({type: REMOVE_ORDER_TICKET, ticketId})


// -------------- ASYNC ACTION CREATORS
export const postCurrentOrder = (userID, orderID, eventID) => (dispatch) => {
  axios.post('/api/orders', {
      userID, orderID, eventID
  })
    .then(res => dispatch(setCurrentOrder(res.data)))
}

export const checkCurrentOrder = (userId) => (dispatch) => {
  axios.get(`/api/orders/ordercheck/${userId}`)
    .then(res => dispatch(setCurrentOrder(res.data)))
}

export const completeCurrentOrder = (orderId, userId) => (dispatch) => {
  axios.put(`/api/orders/${orderId}/complete`, {userID: userId})
    .then(res => dispatch(clearCurrentOrder()))
}

export const deleteDBTicket = id => (dispatch, getState) => {
  axios.put('/api/tickets', {ticketID: id})
    .then(res => {
      dispatch(removeOrderTicket(res.data.id))
    })
}


// -------------- REDUCER
const reducer = (state = initialOrder, action) => {
  switch(action.type) {
    case SET_CURRENT_ORDER:
      return action.currentOrder

    case CLEAR_CURRENT_ORDER:
      return {}

    case REMOVE_ORDER_TICKET:
      let updatedTickets = []
      if(state.tickets){
        updatedTickets = state.tickets.filter(ticket => ticket.id !== action.ticketId)
      }
      return Object.assign({}, state, {tickets: updatedTickets})

    default: return state
  }
}

export default reducer
