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
  Col,Modal, ModalHeader, ModalBody, ModalFooter, Form,FormGroup, Label, Input, Button
  // NavbarText
} from 'reactstrap';
import {Redirect} from 'react-router'
import Signup from '../Start/Signup';
let redirectVar=null, modalDisp=null, loginModalFlag=false,signupModalFlag=false, isOpen=false, modalSignup=false, startPageFlag=false;
class NavBarLoggedOut extends React.Component {

  constructor(props)
  {
      super(props);
      this.state={email:"",password:""};
    }
    loginBtnHandler=()=>{
      let email=this.state.email;
      let password=this.state.password;
      console.log(email,'--',password);
      let data={email:email,password:password};
      // axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
      // axios.post(hostedAddress+":3001/login", data)
      // .then(response => {
        localStorage.setItem('email',email);
        loginModalFlag=false;
        signupModalFlag=false;
        startPageFlag=true;
        this.setState({});   
      // })
      // .catch(res=>{
      //   alert('Invalid');
      // })
    }
    emailHandler=(e)=>{
      this.setState({email:e.target.value});
    }
    passwordHandler=(e)=>{
      this.setState({password:e.target.value});
    }
  toggleLogin = () => {
    isOpen=!isOpen;
    loginModalFlag=true;
    this.setState({})
  }
loginHandler=()=>{
  loginModalFlag=true;
  isOpen=true;
  this.setState({});
}
loadSignup=()=>{
  loginModalFlag=false;
  signupModalFlag=true;
  modalSignup=true;
  isOpen=true;
  this.setState({});
}
toggleSignup=()=>{
  modalSignup=!modalSignup;
  signupModalFlag=true;
  this.setState({})
}
render(){
  // if(!localStorage.getItem('email') && !loginModalFlag)
  // {
  //     redirectVar=<Redirect to='/start'/>
  // }
  // else
  //     redirectVar=null;
  if(startPageFlag)
  {
    modalDisp=<Redirect to='/start'/>
    startPageFlag=false;
  }
  if(loginModalFlag)
  {
  modalDisp=<div>
  <Modal isOpen={isOpen} toggle={this.toggleLogin} >
    <ModalHeader toggle={this.toggleLogin}>Enter your Credentials</ModalHeader>
    <ModalBody>
    <Form>
  <FormGroup row>
    <Label for="exampleEmail" sm={2}>Email</Label>
    <Col sm={10}>
      <Input type="email" name="email" id="exampleEmail" placeholder="email" onChange={this.emailHandler.bind(this)}/>
    </Col>
  </FormGroup>
  <FormGroup row>
    <Label for="exampleEmail2" sm={2}>Password</Label>
    <Col sm={10}>
      <Input type="password" name="email" id="exampleEmail2" placeholder="password" onChange={this.passwordHandler.bind(this)}/>
    </Col>
  </FormGroup>
  <a href="#" onClick={this.loadSignup}>Don't have an account? Signup</a>
</Form>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={this.loginBtnHandler}>Login</Button>{' '}
      <Button color="secondary" onClick={this.toggleLogin}>Cancel</Button>
    </ModalFooter>
  </Modal>
</div>
loginModalFlag=false;   
}
if(signupModalFlag)
          {
            modalDisp=<div>
            <Modal isOpen={modalSignup} toggle={this.toggleSignup}>
              <ModalHeader toggle={this.toggleSignup}>Create your account</ModalHeader>
              <ModalBody>
              {/* <a href='' onClick={this.loadSignup}><img src="https://img.icons8.com/flat_round/64/000000/circled-left-2--v2.png"/></a> */}
              <Button onClick={this.loginHandler}>Back to Login</Button>
              <br/><br/>
                <Signup/>
              </ModalBody>
            </Modal>
          </div>
            signupModalFlag=false;
          }
  return (
    <div>
            {modalDisp}
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Home</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse navbar>
          <Nav className="mr-auto" navbar>
          <NavItem>
              <NavLink href="/start">Compute</NavLink>
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
              <NavLink  onClick={this.loginHandler}>Login</NavLink>
            </NavItem></Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
}
}
export default NavBarLoggedOut;