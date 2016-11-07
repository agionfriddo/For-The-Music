import axios from 'axios'

const reducer = (state=null, action) => {
  switch(action.type) {
  case AUTHENTICATED:
    return action.user

  case UPDATE_ORDERS:
    const updatedState = Object.assign({}, state, {orders: action.ordersArr})
    return updatedState
  }
  return state
}

const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = user => ({
  type: AUTHENTICATED, user
})

const UPDATE_ORDERS = 'UPDATE_ORDERS'

export const updateOrders = ordersArr => ({
  type: UPDATE_ORDERS, ordersArr
})

export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/local/login',
      {username, password})
      .then(() => dispatch(whoami()))
      .catch(() => {
				 dispatch(whoami())
				 alert("Logging in didn't happen. Perhaps the username / password doesn't exit.");
			})

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)))

// export const fetchOrders = id =>
//   dispatch => {
//     console.log('success')
//     axios.get(`/api/users/${id}/orders`)
//       .then(response => {
//         const ordersArr = response.data
//         dispatch(updateOrders(ordersArr))
//       })
//       .catch(failed => dispatch(authenticated(null)))
//   }

export const getUserOrders = (userId) => (
  dispatch => {
     axios.get(`/api/users/${userId}/orders`)
      .then(res => dispatch(updateOrders(res.data)))
  }
)

export default reducer
