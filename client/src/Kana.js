import React, { Component } from 'react';
import { Tabs, Tab } from "react-bootstrap";
import Map from './Map';
import Kalkkuna from './Tabit';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";


export default class Kokis extends Component {
  render() {
    
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
        );
                }
              } 
        