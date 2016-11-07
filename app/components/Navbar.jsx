import React from 'react';
import { connect } from 'react-redux';
import WhoAmI from './WhoAmI';
import Login from './Login';
import { Link } from 'react-router';


const navbar = ({logout, user}) => (

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
			<div className="navbar-right">
				<Link to="/cart"><button className="btn btn-default navbar-btn "><span className="glyphicon glyphicon-shopping-cart"></span></button></Link>
			</div>
      {user ? <WhoAmI/> : <Login/>}
				{user 
				? <div className="navbar-right">
  				  <Link to="/myaccount">
							<button className="btn btn-default navbar-btn "> My Account </button>
						</Link> 
    				<button className="btn btn-default navbar-btn logout" onClick={logout}>Logout</button>
					</div>
				: <Link to="/signup"><button className="btn btn-default navbar-btn "> Sign Up </button></Link>
				}
			</div>
    </div>
</nav>
)

export default navbar
