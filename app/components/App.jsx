import React from 'react';
import { connect } from 'react-redux'
import Navbar from './Navbar'
import {logout} from 'APP/app/reducers/auth'

const AppComponent = function({user, children, logout}) {
  return (
    <div>
        <Navbar user={user} logout={logout} />
        <div>
          {children}
        </div>
    </div>
  )
}

const AppContainer = connect(
  ({ auth }) => ({ user: auth }),
  {logout}

) (
  ({ user, children, logout}) =>
    <AppComponent children={children} user={user} logout={logout}/>
)

export default AppContainer;
