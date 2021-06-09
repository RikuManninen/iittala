
import React, { Component } from 'react';
import Tab from "./Kana"; 
import Map from './Map';




class App extends Component {
  render(){
    return(
      <div className="container">
        <Map/>
        <Tab/>
      </div>
    )
  }
}

export default App;
