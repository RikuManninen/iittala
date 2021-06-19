import "./App.scss";
import Map from "./Map";
import {Tab, Tabs, TabList,TabPanel} from 'react-tabs';




function Tabits() {
  return <div class='tav'>
    <Tabs >
  <TabList>
    <Tab class="col col1">Map</Tab>
    <Tab class="col col2">Information</Tab>
    <Tab class="col col3">Riku</Tab>
        
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
