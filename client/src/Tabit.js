import Map from "./Map";
import {Tab, Tabs, TabList,TabPanel} from 'react-tabs';
import Quizes from "./Quizes";
import InfoIcon from '@material-ui/icons/Info';
import MapIcon from '@material-ui/icons/Map';
import './Tabit.scss';

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
        <Tab ><MapIcon /></Tab>
        <Tab ><InfoIcon /></Tab>
        <Tab ><b>Quiz</b></Tab>
      </TabList>

    </Tabs>
  )
}

export default Tabits;
