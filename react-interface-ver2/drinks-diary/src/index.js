import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import LandingView from './Components/landing-view';
import LoginForm from './Components/login-form';
import RegistrationForm from './Components/registration-form';

import DesktopLayout from './Components/desktop-layout';
import IndexView from './Components/index-view';
import DiariesView from './Components/diaries-view';
import DiaryView from './Components/diary-view';
import CreateDiaryEntry from './Components/create-diary-entry';
import EditDiaryEntry from './Components/edit-diary-entry';
import AccountView from './Components/account-view';

import * as serviceWorker from './serviceWorker';


const UnauthorizedRoute = ({ component: Component, ...rest }) => (
    <Route exact {...rest} render={props => (
        <LandingView>
            <Component {...props}/>
        </LandingView>
    )}/>
)

const AuthorizedRoute = ({ component: Component, ...rest }) => (
    <Route exact {...rest} render={props => (
        <DesktopLayout>
            <Component {...props}/>
        </DesktopLayout>
    )}/>
)

class App extends Component {
    
    render() {
        return (
            <BrowserRouter >
                <main>
                    <UnauthorizedRoute path="/landing" component={LoginForm} />
                    <UnauthorizedRoute path="/register" component={RegistrationForm} />

                    <AuthorizedRoute path={"/"} component={IndexView} />
                    <AuthorizedRoute path={"/my-diaries"} component={DiariesView} />
                    <AuthorizedRoute path={"/diary/:dairyID"} component={DiaryView} />
                    <AuthorizedRoute path={"/diary/:diaryID/create-entry"} component={CreateDiaryEntry} />
                    <AuthorizedRoute path={"/diary/:diaryID/edit-entry"} component={EditDiaryEntry} />
                    <AuthorizedRoute path={"/diary/:diaryID/exercise-log"} />

                    <AuthorizedRoute path={"/account"} component={AccountView} />         
                </main>
            </BrowserRouter>
        )    
    }
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
