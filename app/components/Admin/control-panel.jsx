import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

class ControlPanel extends Component {


    render() {
      const isAdmin = this.props.auth ? this.props.auth.isAdmin ? 'YES' : 'NO' : 'NO';
      return (
        <div className="container">
          <div className='row'>
            <div className="col-md-12">
              <h1>Admin Page</h1>
              <p>Are you an admin? {isAdmin}</p>
              <div id="adminPanel">
                <Link to="/controlpanel/events"><h3>Events </h3></Link>
                <Link to="/controlpanel/artists"><h3>Artists </h3></Link>
                <Link to="/controlpanel/venues"><h3>Venues </h3></Link>
                <h3>Users </h3>
                <h3>Tickets </h3>
                <h3>View/Edit Orders</h3>
              </div>
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
