import axios from 'axios'


// -------------- CONSTANTS
const UPDATE_OR_CREATE_ORDER = 'UPDATE_OR_CREATE_ORDER'


// -------------- SYNC ACTION CREATORS
export const updateOrCreateOrder = currentOrder => ({type: UPDATE_OR_CREATE_ORDER, currentOrder})


// -------------- ASYNC ACTION CREATORS
export const postCurrentOrder = (userID, orderID, eventID) => (dispatch) => {
  axios.post('/api/orders', {
      userID, orderID, eventID
  })
    .then(res => dispatch(updateOrCreateOrder(res.data)))
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
    case UPDATE_OR_CREATE_ORDER:
      return action.currentOrder
    default: return state
  }
}

export default reducer
