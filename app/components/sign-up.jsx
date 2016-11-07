import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { signup } from '../reducers/sign-up';

/* -----------------    COMPONENT     ------------------ */

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h1>Sign Up Today</h1>
            <div className="signin-container">
              <div className="buffer local">
                  <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <label>email</label>
                        <input
                          name="email"
                          type="email"
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-group">
                          <label>password</label>
                          <input
                            name="password"
                            type="password"
                            className="form-control"
                            required
                          />
                      </div>
                      <button type="submit" className="btn btn-block btn-primary">SIGN UP!</button>
                  </form>
              </div>
              <div className="or buffer">
                <div className="back-line">
                  <span>OR</span>
                </div>
              </div>
              <div className="buffer oauth">
                <p>
                  <a target="_self"
                     href="/auth/google"
                     className="btn btn-social btn-google">
                  <i className="fa fa-google"></i>
                  <span>with Google</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onSubmit(event) {
    event.preventDefault();
    const { signup } = this.props;
    const credentials = {
      email: event.target.email.value,
      password: event.target.password.value
    }
    signup(credentials);
  }
}

/* -----------------    CONTAINER     ------------------ */


const mapDispatchSignup = dispatch => ({
  signup: credentials => {
    dispatch(signup(credentials));
    browserHistory.push('/');
  }
})

const SignUpContainer = connect(null, mapDispatchSignup)(SignUp)

export default SignUpContainer
