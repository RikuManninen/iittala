import "./App.scss";
import Map from "./Map";
import {Tab, Tabs, TabList,TabPanel} from 'react-tabs';




function Tabits() {
  return <div>
    <Tabs >
  <TabList>
    <Tab >Map</Tab>
    <Tab >Information</Tab>
    <Tab >Riku</Tab>
    
  </TabList>

  <TabPanel>
    <p>
      
      <Map/>
    </p>
    
  </TabPanel>
  <TabPanel>
    <p>
      Tää on placeholder nyt muokkaan css vähän.
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
