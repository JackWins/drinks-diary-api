import React from 'react'

// Import components 
import RegistrationForm from './registration-form'

// Import stylesheets
import '../style/app.css'

class Landing extends React.Component {
    render() {
        return (
            <div class="Landing-Main">
                <div class="Divider"></div>
                <div className="Landing-Content">
                    <div>
                        <h2>Welcome to Drinks Diary</h2>
                        Log-in to manage your diary, or register to get started now
                    </div>


                    <RegistrationForm />

                </div>
                <div class="Divider"></div>
            </div>
        )
    } 
}


export default Landing