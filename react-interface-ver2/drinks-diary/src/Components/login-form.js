import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../Style/style.css'


class LoginForm extends Component {
  render() {
    return (
        <div id="login-form">
            
            <h3>Welcome...</h3>
            <h5>Sign in or register an account today.</h5>

            <form>
                <div className="input-group">
                    <label for="email-address">E-mail Address</label>
                    <input type="email" id="email-address" className="form-input" placeholder="john.smith@example.com" />
                </div>

                <div className="input-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" className="form-input" placeholder="password..." />
                </div>

                <div className="login-actions">
                    <Link to="/register" id="register" className="button button-warning">Register <i class="fas fa-user-plus"></i></Link>
                    <button type="submit" id="login" className="button button-success">Login <i className="fas fa-sign-in-alt"></i></button>
                </div>

            </form>
        </div>
    );
  }
}

export default LoginForm;