import { Dropdown } from "react-bootstrap";
import React, { Component } from 'react';
import Kalkkuna from "./Tabit"; 
import Map from './Map';




class App extends Component {
  render(){
    return(
      
        
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>
    
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1"><Kalkkuna/></Dropdown.Item>
        <Dropdown.Item href="#/action-2"><Map/></Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown>
      
    )
  }
}

export default App;
