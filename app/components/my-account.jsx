import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserOrders } from '../reducers/auth'
import { Link } from 'react-router';

class MyAccount extends Component {

    componentDidMount(){
      // updateUserOrders
      console.log(this.props.getUserOrders)
      if(this.props.auth) {
        this.props.getUserOrders(this.props.auth.id)
      }
    }

    render() {
      let name = ''
      let email = ''
      let orders = null
      let isAdmin = false
      if (this.props.auth) {
        name = this.props.auth.name
        email = this.props.auth.email
        orders = this.props.auth.orders
        isAdmin = this.props.auth.isAdmin
      }
      if(orders) {
        orders = orders.filter(order => {
          console.log(order)
          if('in-cart' !== order.status) {return true}
        })
      }
      return (
        <div className="container">
          <div className='row'>
            <div className="col-md-12">
              <h1>Your Account Information</h1>
              <p>Name: {name}</p>
              <p>Email: {email}</p>
              {isAdmin ? <Link to="/controlpanel"><div className="btn btn-success">Secret Admin Control Panel</div></Link> : <Link to="/controlpanel"><div className="btn btn-success">Secret Admin Control Panel</div></Link>}
            </div>
          </div>
          <div className='row'>
            <div className="col-md-12">
              <h3>Previous Orders:</h3>
              {orders && orders.map(order => {
                return(
                  <div className="row" key={order.id}>
                    <div className="col-md-12">
                    <h1>Order #{order.id}</h1>
                    <h4>{order.tickets.length} - tickets</h4>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )
    }

}

const mapStateToProps = state => ({auth: state.auth})
const mapDispatchToProps = { getUserOrders }

const MyAccountContainer = connect(mapStateToProps, mapDispatchToProps)(MyAccount)

export default MyAccountContainer


