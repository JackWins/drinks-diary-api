import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class RegistrationForm extends Component {
  render() {
    return (
        <div id="registration-form">
            
            <h3>Register an account...</h3>

            <form>
                
                <div className="input-group">
                    <label for="email-address">E-mail Address</label>
                    <input type="email" id="email-address" className="form-input" placeholder="john.smith@example.com" />
                </div>

                <div className="input-row">
                
                    <div className="input-group">
                        <label for="forename">Forename</label>
                        <input type="text" id="forename" className="form-input" placeholder="forename..."/>
                    </div>
                    
                    <div className="input-group">
                        <label for="surname">Surname</label>
                        <input type="text" id="surname" className="form-input" placeholder="surname..." />
                    </div>

                </div>

                <div className="input-row">
                
                    <div className="input-group">
                        <label for="dob">Date of Birth</label>
                        <input type="date" id="dob" className="form-input" />
                    </div>
                    
                    <div className="input-group">
                        <label for="gender">Gender</label>
                        <select type="text" id="gender" className="form-input">
                            <option value="" selected disabled>- Select a gender -</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                </div>

                <div className="input-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" className="form-input" placeholder="password..." />
                </div>

                <div className="input-group">
                    <label for="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" className="form-input" placeholder="confirm password..." />
                </div>


                <div className="registration-actions">
                    <Link to="/landing" id="cancel" className="button button-danger">Cancel <i class="fas fa-user-times"></i></Link>
                    <button type="submit" id="create-account" className="button button-success">Create Account <i className="fas fa-sign-in-alt"></i></button>
                </div>

            </form>
        </div>
    );
  }
}

export default RegistrationForm;