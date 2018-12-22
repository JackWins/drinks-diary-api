import React, { Component } from 'react';
import logo from './logo.svg';

// Import components
import Landing from './components/landing'

// Import Stylesheets
import './style/app.css';


class App extends Component {
  render() {
    return (
      <div className="App-Main">

        <div className="App-Banner">
          Banner Content
        </div>
        
        <div className="App-Content">
          <Landing />
        </div>
        
      </div>
    );
  }
}


export default App;
