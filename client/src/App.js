import { Tabs, Tab } from "react-bootstrap";
import React, { Component } from 'react';
import Kalkkuna from "./Tabit"; 
import Map from './Map';




class App extends Component {
  render(){
    return(
      
        
        <div className="Kokis">
       <Tabs defaultActiveKey="planet" id="uncontrolled-tab-example">
        <Tab eventKey="planet" title="Planets">
          <Kalkkuna/>
        </Tab>
        <Tab eventKey="list" title="Selected">
          <Map/>
        </Tab>
      </Tabs>
     </div>
      
    )
  }
}

export default App;
