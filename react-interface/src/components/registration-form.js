// JavaScript imports
import React from 'react'
import DatePicker from 'react-datepicker'

// Stylesheet imports
import '../style/app.css'
import 'react-datepicker/dist/react-datepicker.css'

class Registration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            username: "",
            password: "",
            forename: "",
            surname: "",
            gender: "",
            dob: "" 
        }
    };
    
    validateUsername = (event) => {
        return
    };

    validatePassword = (event) => {
        
    }

    validateEmail = (event) => {

    }

    confirmPassword = (event) => {

    }

    updateGender = (event) => {

    }

    updateDob = (event) => {

    }

    render() {
        return (
            <form method='POST' id='registration_form'>
                <label>Username:</label>
                <input className='Input-Element' type='text' name='username' value={this.state.username} placeholer='Enter username...' onChange={this.validateUsername} />
                <input className='Input-Element' type='text' name='email' value={this.state.email} placeholer='Enter e-mail address...' onChange={this.validateEmail} />
                <input className='Input-Element' type='password' name='password' value={this.state.password} placeholer='Enter password...' onChange={this.validatePassword} />
                <input className='Input-Element' type='password' name='confirm_password' placeholer='Confirm password...' onChange={this.confirmPassword} />
                <select className='Input-Element' name='gender' onChange={this.updateGender}>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </select>
                <DatePicker onChange={this.updateDob} />

            </form>
        )
    };
}

export default Registration