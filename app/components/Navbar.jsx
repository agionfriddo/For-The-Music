import React from 'react';
import { connect } from 'react-redux';
import WhoAmI from './WhoAmI';
import Login from './Login';
import { Link } from 'react-router';


const navbar = ({user}) => (

<nav className="navbar navbar-inverse navbar-static-top">
  <div className="container">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <Link to="/" className="navbar-brand">For The Music</Link>
    </div>
    <div id="navbar" className="collapse navbar-collapse">
					<Link to="/cart"><button className="btn btn-default navbar-btn navbar-right"><span className="glyphicon glyphicon-shopping-cart"></span></button></Link>
          {user ? <WhoAmI/> : <Login/>}
    </div>
  </div>
</nav>
)

export default navbar
