import "./App.scss";
import Map from "./Map";
import {Tab, Tabs, TabList,TabPanel} from 'react-tabs';
import Quizes from "./Quizes";




function Tabits() {
  return <div class='tav'>
    <Tabs >
  <TabList>
    <Tab >Map</Tab>
    <Tab >Information</Tab>
    <Tab >Riku</Tab>
    
  </TabList>

  <TabPanel id='Tab1'>
    <p>
      
      <Map/>
    </p>
    
  </TabPanel>
  <TabPanel id='Tab2'>
    <p>
      <Quizes/>
    </p>
    
  </TabPanel>
  <TabPanel id='Tab3'>
    <p>
      Testiä varten
    </p>
    
  </TabPanel>
  
</Tabs>
</div>
}

export default Tabits;
