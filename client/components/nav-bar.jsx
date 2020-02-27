import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  DropdownItem,
  NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar style={{ backgroundColor: '#A9A9A9' }} light expand="md" className="text-white">
        <NavbarBrand tag={Link} to='/'className="navButton text-white" >
          <img src="/images/croppedTransparentLogoOnly.png" style={{ width: 45, marginRight: 10 }} />
          Clean Stride
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto text-white" navbar>
            <NavItem >
              <NavLink tag={Link} to='/' className="navButton text-white">Search Recovery</NavLink>
            </NavItem>
            <DropdownItem divider />
            <NavItem >
              <NavLink tag={Link} to='/meetings' className="navButton text-white">Meeting Directory</NavLink>
            </NavItem>
            <DropdownItem divider />
            <NavItem >
              <NavLink tag={Link} to='/favorites' className="navButton text-white">Favorite Meetings</NavLink>
            </NavItem>
            <DropdownItem divider />
            <NavItem>
              <NavLink tag={Link} to='/calendar' className="navButton text-white">Calendar</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
