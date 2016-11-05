import React, { Component } from 'react';
import { connect } from 'react-redux'

class MyAccount extends Component {

    render() {
      let name = ''
      let email = ''
      if (this.props.auth) {
        name = this.props.auth.name
        email = this.props.auth.email
      }

      return (
        <div className="container">
          <div className='row'>
            <div className="col-md-12">
              <h1>Your Account Information</h1>
              <p>Name: {name}</p>
              <p>Email: {email}</p>
            </div>
          </div>
          <div className='row'>
            <div className="col-md-12">
              <h3>See Your Previous Orders</h3>
              <div className="btn btn-success" onClick={() => {console.log('nerd alert')}}>FETCH</div>
            </div>
          </div>
        </div>
      )
    }

}

const mapStateToProps = state => ({auth: state.auth})


const MyAccountContainer = connect(mapStateToProps)(MyAccount)

export default MyAccountContainer


