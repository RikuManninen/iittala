import "./App.scss";
import Map from "./Map";
import {Tab, Tabs, TabList,TabPanel} from 'react-tabs';
import Quizes from "./Quizes";



function Tabits() {
  return (
    <Tabs >

      <TabPanel>
        <Map/>
      </TabPanel>

      <TabPanel>
        Lorem ipsum ...
      </TabPanel>

      <TabPanel>
        <Quizes/>
      </TabPanel>

      <TabList>
        <Tab >Map</Tab>
        <Tab >Information</Tab>
        <Tab >Quiz</Tab>
      </TabList>

    </Tabs>
  )
}

export default Tabits;
