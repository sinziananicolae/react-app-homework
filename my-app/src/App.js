import React, { Component } from 'react';
import * as $ from 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-theme.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import logo from './content/img/logo.svg';
import './content/css/App.css';
import CarsList from './carComponents/CarsList.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <CarsList/>
      </div>
    );
  }
}

export default App;
