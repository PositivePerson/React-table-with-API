import React, { Component } from 'react';
import './App.css';

import ServersState from './context/servers/serversState';

import Navbar from './components/Navbar';
import TableWithExtras from './components/TableWithExtras';

class App extends Component {
  render() {
    return (

      <ServersState>
        <div className="App">
          <Navbar />
          <div className="box">
            <TableWithExtras />
          </div>
        </div>
      </ServersState>

    );
  }
}

export default App;
