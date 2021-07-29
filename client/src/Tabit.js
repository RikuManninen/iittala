import Map from "./Map";
import {Tab, Tabs, TabList,TabPanel} from 'react-tabs';
import Quizes from "./Quizes";
import InfoIcon from '@material-ui/icons/Info';
import MapIcon from '@material-ui/icons/Map';
import './Tabit.scss';
import { useState } from "react";

function Tabits() {

  const [activateDevTools, setActivateDevTools] = useState(false)
  const [count, setCount] = useState(1)
  const countHandler = () => {
    setCount(count+1)
    if(count >= 5) {
      setActivateDevTools(true)
      document.body.classList.add('dev-tools-active')
    }
  }
  const countReset = () => {
    setCount(1)
  }

  return (
    <Tabs >

      <TabPanel>
        <Map activateDevTools={ activateDevTools } />
      </TabPanel>

      <TabPanel>
        Lorem ipsum ...
      </TabPanel>

      <TabPanel>
        <Quizes/>
      </TabPanel>

      <TabList>
        <Tab onClick={ countHandler }><MapIcon /></Tab>
        <Tab onClick={ countReset }><InfoIcon /></Tab>
        <Tab onClick={ countReset }><b>Quiz</b></Tab>
      </TabList>

    </Tabs>
  )
}

export default Tabits;
