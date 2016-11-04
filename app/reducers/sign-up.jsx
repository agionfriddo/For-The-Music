import axios from 'axios'

// ------------- CONSTANTS


// ------------- SYNC ACTION CREATORS


// ------------- ASYNC ACTION CREATORS
export const signup = credentials => dispatch => {
  axios.post('/api/users', credentials)
       .then(res => {console.log('account created!')})
       .catch(err => console.error('Signup unsuccesful', err));
}


// ------------- REDUCER
