import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css'; 

function DropDownBox() {
  return (
    <Dropdown className="d-inline mx-2">
      <Dropdown.Toggle id="dropdown-autoclose-true">
        Sort
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-options">
        <Dropdown.Item href="#/action-1" style={{ display: 'block' }}>Name A-Z</Dropdown.Item>
        <Dropdown.Item href="#/action-2" style={{ display: 'block' }}>Name Z-A</Dropdown.Item>
        <Dropdown.Item href="#/action-3" style={{ display: 'block' }}>Date Added</Dropdown.Item>
        <Dropdown.Item href="#/action-4" style={{ display: 'block' }}>Last Contacted</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDownBox;