import axios from 'axios'


// -------------- CONSTANTS
const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER'


// -------------- SYNC ACTION CREATORS
export const setCurrentOrder = currentOrder => ({type: SET_CURRENT_ORDER, currentOrder})


// -------------- ASYNC ACTION CREATORS
export const postCurrentOrder = (userID, orderID, eventID) => (dispatch) => {
  axios.post('/api/orders', {
      userID, orderID, eventID
  })
    .then(res => dispatch(setCurrentOrder(res.data)))
}

export const checkCurrentOrder = () => (dispatch) => {
  axios.get('/api/orders/0/sessioncheck')
    .then(res => dispatch(setCurrentOrder(res.data)))
}


// -------------- REDUCER
const initialOrder = {
  id: null,
  date: '',
  ticketPrice: '',
  artists:[{name: ''}],
  venue: {name: ''}
}

const reducer = (state = initialOrder, action) => {
  switch(action.type) {
    case SET_CURRENT_ORDER:
      return action.currentOrder
    default: return state
  }
}

export default reducer
