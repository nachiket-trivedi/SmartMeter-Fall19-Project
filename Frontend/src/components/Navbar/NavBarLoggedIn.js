import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  // NavbarText
} from 'reactstrap';
import { Redirect } from 'react-router';
let redirectVar=null,redirectToStartFlag=false;
class NavBarLoggedIn extends React.Component {

    constructor(props)
    {
        super(props);
        this.state={isOpen:false};
    }

  toggle = () => this.setState({isOpen:!this.state.isOpen});
  logoutHandler=()=>{
    localStorage.removeItem('email');
    localStorage.removeItem('allSchedulesArray');
    localStorage.removeItem('scheduleInfo');
    localStorage.removeItem('computationResults');

    // localStorage.removeItem('fname');
    this.setState({});
  }
  render(){
    if(!localStorage.getItem('email'))
    {
        redirectVar=<Redirect to='/start'/> 
    }
    else
        redirectVar=null;
  return (
    <div>
    {redirectVar}
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Home</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
          <NavItem>
              <NavLink href="/start">Compute</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/dashboard">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/pastSchedules">Past Schedules</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/reports">Reports</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/shop">Shop</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/about">Contact Us</NavLink>
            </NavItem>
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
          <Nav navbar>            
          <NavItem>
          <NavLink href="" onClick={this.logoutHandler} >Logout</NavLink>
            </NavItem></Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
        }
}

export default NavBarLoggedIn;