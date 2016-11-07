import axios from 'axios'
import {login} from './auth'

// ------------- CONSTANTS


// ------------- SYNC ACTION CREATORS


// ------------- ASYNC ACTION CREATORS
export const signup = credentials => dispatch => {
  axios.post('/api/users', credentials)
       .then(res => {console.log('account created!')})
			 .then(() => dispatch(login(credentials.email, credentials.password)))
       .catch(err => console.error('Signup unsuccesful', err));
}


// ------------- REDUCER
