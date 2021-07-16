import "./App.scss";
import Map from "./Map";
import {Tab, Tabs, TabList,TabPanel} from 'react-tabs';
import Quizes from "./Quizes";
import Ar from "./Ar";




function Tabits() {
  return <div class='tav'>
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
      <Quizes/>
    </p>
    
  </TabPanel>
  <TabPanel style={{height: 'calc(100vh - 63px)'}}>
    <Ar />
  </TabPanel>
  
</Tabs>
</div>
}

export default Tabits;
