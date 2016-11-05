import React from 'react';
import { connect } from 'react-redux'
import Navbar from './Navbar'

const AppComponent = function({user, children}) {
  return (
    <div>
        <Navbar user={user}/>
        <div>
          {children}
        </div>
    </div>
  )
}

const AppContainer = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <AppComponent children={children} user={user}/>
)

export default AppContainer;
