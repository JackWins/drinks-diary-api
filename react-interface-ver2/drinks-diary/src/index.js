import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

/* Desktop Component Imports */
import './Style/desktop-style.css'
import LandingView from './Components/landing-view';
import DesktopLayout from './Components/desktop-layout';
import IndexView from './Components/index-view';
import DiariesView from './Components/diaries-view';
import DiaryView from './Components/diary-view';
import EditDiaryEntry from './Components/edit-diary-entry';
import AccountView from './Components/account-view';

/* Shared Component Imports */
import LoginForm from './Components/login-form';
import RegistrationForm from './Components/registration-form';
import CreateDiaryEntry from './Components/create-diary-entry'

/* Mobile Component Imports */
import './Style/mobile-style.css'
import MobileLayout from './Components/mobile/mobile-layout'
import MobileIndex from './Components/mobile/index'
import MobileDiariesView from './Components/mobile/diaries-view'
import MobileDiaryOverview from './Components/mobile/diary-overview'


import * as serviceWorker from './serviceWorker';


const DesktopRoute = ({ component: Component, ...rest }) => {
    var Layout = LandingView
    if (rest.authStatus) 
        Layout = DesktopLayout

    return(
        <Route exact {...rest} render={props => (
            <Layout>
                <Component {...props}/>
            </Layout>
        )}/>
    )
}


const MobileRoute = ({ component: Component, ...rest }) => {  
    return(
        <Route exact {...rest} render={props => (
            <MobileLayout>
                <Component {...props}/>
            </MobileLayout>
        )}/>
    )
}


class App extends Component {
    
    constructor() {
        super();
        this.state = {
            isMobile: true,
            isAuthorized: true,
            width: window.innerWidth
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize)
        if (this.state.width > 600) {
            this.setState({ isMobile: false })
        }
    }
      
    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize)
    }

    onWindowResize = () => {
        this.setState({ width: window.innerWidth })
        if (window.innerWidth > 600)
            this.setState({ isMobile: false })
        else
            this.setState({ isMobile: true })
    }

    renderDesktop = () => {
        return (
            <BrowserRouter >
                <main id="desktop-main">
                    <DesktopRoute authStatus={this.state.isAuthorized} path="/landing" component={LoginForm} />
                    <DesktopRoute authStatus={this.state.isAuthorized} path="/register" component={RegistrationForm} />

                    <DesktopRoute authStatus={this.state.isAuthorized} path={"/"} component={IndexView} />

                    <DesktopRoute authStatus={this.state.isAuthorized} path={"/diaries"} component={DiariesView} />
                    <DesktopRoute authStatus={this.state.isAuthorized} path={"/diaries/:dairyID"} component={DiaryView} />
                    <DesktopRoute authStatus={this.state.isAuthorized} path={"/diaries/:diaryID/create"} component={CreateDiaryEntry} />
                    <DesktopRoute authStatus={this.state.isAuthorized} path={"/diaries/:diaryID/edit"} component={EditDiaryEntry} />
                    <DesktopRoute authStatus={this.state.isAuthorized} path={"/diaries/:diaryID/exercise-log"} />

                    <DesktopRoute authStatus={this.state.isAuthorized} path={"/account"} component={AccountView} />         
                </main>
            </BrowserRouter>
        )    
    } 

    renderMobile = () => {
        return(
            <BrowserRouter>
                <main id="mobile-main">
                    <MobileRoute path={"/login"} component={LoginForm} />
                    <MobileRoute path={"/register"} component={RegistrationForm} />

                    <MobileRoute path={"/"} component={ MobileIndex } />
                    <MobileRoute path={"/diaries"} component={ MobileDiariesView } />
                    <MobileRoute path={"/diaries/:diaryID"} component={ MobileDiaryOverview } />
                    <MobileRoute path={"/diaries/:diaryID/create"} component={ CreateDiaryEntry } />
                </main>
            </BrowserRouter>
        )
    }

    render() {
        if (this.state.isMobile) 
            return(this.renderMobile())
        else 
            return(this.renderDesktop())
    }
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
