import Dropdown from 'react-bootstrap/Dropdown';

function DropDownBox() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Sort
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Name</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Date Added</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Last Contacted</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDownBox;