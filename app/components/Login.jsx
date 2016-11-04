import React from 'react'

export const Login = ({ login }) => (
  <form className="navbar-form navbar-right" onSubmit={evt => {
    evt.preventDefault()
    login(evt.target.username.value, evt.target.password.value)
  } }>
    <input className="form-control" name="username" />
    <input className="form-control" name="password" type="password" />
    <input className="btn btn-default" type="submit" value="Login" />
  </form>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
  state => ({}),
  {login},
) (Login)
