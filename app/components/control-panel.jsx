import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

class ControlPanel extends Component {


    render() {
      const isAdmin = this.props.auth ? this.props.auth.isAdmin ? 'YES' : 'NO' : 'NO';
      console.log(this.props)
      return (
        <div className="container">
          <div className='row'>
            <div className="col-md-12">
              <h1>Admin Page (links should be inline)</h1>
              <p>Are you an admin? {isAdmin}</p>
              <Link to="/controlpanel/events"><h3>Events</h3></Link>
              <Link to="/controlpanel/artists"><h3>Artists</h3></Link>
              <h3>Venues</h3>
              <h3>Users</h3>
              <h3>Tickets</h3>
              <h3>View / Edit Orders</h3>
            </div>
          </div>
          <hr/>
          <div className='row'>
            <div className="col-md-12">
                {this.props.children}
            </div>
          </div>
        </div>
      )
    }

}

const mapStateToProps = state => ({auth: state.auth })

const ControlPanelContainer = connect(mapStateToProps)(ControlPanel)

export default ControlPanelContainer

