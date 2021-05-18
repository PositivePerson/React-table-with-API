import React, { Component } from 'react';
import './App.css';

import ServersState from './context/servers/serversState';

import Navbar from './components/Navbar';

class App extends Component {
  render() {
    return (
      <ServersState>
        <div className="App">
          <Navbar />
        </div>
      </ServersState>
    );
  }
}

export default App;
