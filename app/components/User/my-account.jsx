import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserOrders } from '../../reducers/auth'
import { Link } from 'react-router';
import ReviewList from '../Review/review-list';

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
      let reviews = null
      let isAdmin = false
      if (this.props.auth) {
        name = this.props.auth.name
        email = this.props.auth.email
        orders = this.props.auth.orders
        reviews = this.props.auth.reviews
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
              <div>
                <p>Name: {name}</p>
                <span className="btn btn-warning btn-xs">Edit Name</span>
              </div>
              <div>  
                <p>Email: {email}</p>
                <div className="btn btn-warning btn-xs">Change Email</div>
              </div>
              <div className="btn btn-warning btn-xs">Change Password</div>
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
          <div className='row'>
            <div className="col-md-12">
              {
                reviews && reviews.length ? <ReviewList reviews={ reviews } /> : <h3>You haven't written any reviews</h3>
              }
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


