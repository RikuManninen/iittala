import React, { Component } from 'react';
import {App3, App2 } from "./Tab"; 




class App extends Component {
  render(){
    return(
      <div className="container">
        <App3/>
        <App2/>
      </div>
    )
  }
}

export default App;
