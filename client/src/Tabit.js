import "./App.scss";
import Map from "./Map";
import {Tab, Tabs, TabList,TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';



function Tabits() {
  return <div>
    <Tabs>
  <TabList>
    <Tab>Map</Tab>
    <Tab>Information</Tab>
    
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
  
</Tabs>
</div>
}

export default Tabits;
