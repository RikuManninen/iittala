import "./App.scss";
import Map from "./Map";
import {Tab, Tabs, TabList,TabPanel} from 'react-tabs';
import Quizes from "./Quizes";




function Tabits() {
  return <div class='tav'>
    <Tabs >
  <TabList>
    <Tab id='Tab1'>Map</Tab>
    <Tab id='Tab2'>Information</Tab>
    <Tab id='Tab3'>Riku</Tab>
    
  </TabList>

  <TabPanel>
    <p>
      
      <Map/>
    </p>
    
  </TabPanel>
  <TabPanel>
    <p>
      <Quizes/>
    </p>
    
  </TabPanel>
  <TabPanel>
    <p>
      Testiä varten
    </p>
    
  </TabPanel>
  
</Tabs>
</div>
}

export default Tabits;
