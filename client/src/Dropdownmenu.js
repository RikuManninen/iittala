import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Tab1 from './Tabit';
import Tab2 from './Tabit';
import Tab3 from './Tabit';


function Dropdownmenu() {
    return <div class='Alas'>
        <Dropdown>
  

  <DropdownButton id="dropdown-item-button" title="Dropdown button">
  <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
  <Dropdown.Item as="button"><Tab1/></Dropdown.Item>
  <Dropdown.Item as="button"><Tab2/></Dropdown.Item>
  <Dropdown.Item as="button"><Tab3/></Dropdown.Item>
</DropdownButton>
</Dropdown>
</div>
}

export default Dropdownmenu;