import axios from 'axios'

// -------------- CONSTANTS
const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER'
const CLEAR_CURRENT_ORDER = 'CLEAR_CURRENT_ORDER'

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


// -------------- ASYNC ACTION CREATORS
export const postCurrentOrder = (userID, orderID, eventID) => (dispatch) => {
  axios.post('/api/orders', {
      userID, orderID, eventID
  })
    .then(res => dispatch(setCurrentOrder(res.data)))
}

export const checkCurrentOrder = (userId) => (dispatch) => {
  axios.get(`/api/orders/0/ordercheck/${userId}`)
    .then(res => dispatch(setCurrentOrder(res.data)))
}

export const completeCurrentOrder = (orderId, userId) => (dispatch) => {
  axios.put(`/api/orders/${orderId}/complete`, {userID: userId})
    .then(res => dispatch(clearCurrentOrder()))
}


// -------------- REDUCER
const reducer = (state = initialOrder, action) => {
  switch(action.type) {
    case SET_CURRENT_ORDER:
      return action.currentOrder

    case CLEAR_CURRENT_ORDER:
      return {
              id: null,
              date: '',
              ticketPrice: '',
              artists:[{name: ''}],
              venue: {name: ''}
            }

    default: return state
  }
}

export default reducer
