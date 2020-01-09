import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Jumbotron,
    Button,
    Container,
    Collapse,
    FormGroup,
    Label,
    Form,
    Input,
    Col,Modal, ModalHeader, ModalBody, ModalFooter
  } from 'reactstrap';
  import FooterPage from './Footer'
  import Signup from './Signup.js';
  import axios from 'axios';
  import "../Start/Start.css"
  import React, { useState } from 'react';
  import {Redirect} from 'react-router';
import ModalLogin from './ModalLogin';
import ModalSignup from './ModalSignup';
import ModalAddApp from './ModalAddApp';
import ApplianceCards from './ApplianceCards';
import SolarPanelCollapser from './SolarPanelCollapser';
import NavBarLoggedOut from '../Navbar/NavBarLoggedOut';
import NavBarLoggedIn from '../Navbar/NavBarLoggedIn';
import {hostedAddress} from '../../GlobalVar'
import { GoogleLogin } from 'react-google-login';

let redirectVar=null, loginModalFlag=false,modalLogin=false, modalSignup=false,signupModalFlag=false, dashboardFlag=false, navLoader=null,goToShopFlag=false, redirectVarShop=null;
  class Start extends React.Component{
    constructor(props){
      super(props);
      this.state={email:"",password:""};
      loginModalFlag=false
      modalLogin=false
      modalSignup=false
      signupModalFlag=false
      dashboardFlag=false
      navLoader=null
      goToShopFlag=false
      redirectVarShop=null
      redirectVar=null
    }
    goToShop=()=>{
      goToShopFlag=true;
      this.setState({})
    }
    loginBtnHandler=()=>{
      let email=this.state.email;
      let password=this.state.password;
      console.log(email,'--',password);
      let data={email:email,password:password};
      axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
      axios.post(hostedAddress+":3001/login/login", data)
      .then(response => {
        console.log('-->',response)
        localStorage.setItem('email',response.data.email);
        dashboardFlag=true;
        loginModalFlag=false;
        signupModalFlag=false;
        this.setState({});   
      })
      .catch(res=>{
        alert('Invalid login');
      })
    }
    emailHandler=(e)=>{
      this.setState({email:e.target.value});
    }
    passwordHandler=(e)=>{
      this.setState({password:e.target.value});
    }
    toggleLogin=()=>{
      modalLogin=!modalLogin;
      loginModalFlag=true;
      this.setState({})
    }
    toggleSignup=()=>{
      modalSignup=!modalSignup;
      signupModalFlag=true;
      this.setState({})
    }
    compute=()=>{
      signupModalFlag=false;
      if(!localStorage.getItem('email'))
      {
        // dashboardFlag=true; //kennedy-remove this later and add the next one
        loginModalFlag=true;
        modalLogin=true;
      }
      else
      {
        dashboardFlag=true;
        loginModalFlag=false;
        signupModalFlag=false;
      }
      this.setState({});
    }
    loadSignup=()=>{
      loginModalFlag=false;
      signupModalFlag=true;
      modalSignup=true;
      this.setState({});
    }
      render()
      {
          if(goToShopFlag)
          { 
            redirectVarShop=<Redirect to="/shop"/>;
            goToShopFlag=false;
          }
          if(dashboardFlag)
          {
            localStorage.setItem('callPSO','true')
            redirectVar=<Redirect to='/dashboard'/>
            dashboardFlag=false;
          }
          if(signupModalFlag)
          {
            redirectVar=<div>
            <Modal isOpen={modalSignup} toggle={this.toggleSignup}>
              <ModalHeader toggle={this.toggleSignup}>Create your account</ModalHeader>
              <ModalBody>
              {/* <a href='' onClick={this.loadSignup}><img src="https://img.icons8.com/flat_round/64/000000/circled-left-2--v2.png"/></a> */}
              <Button onClick={this.compute}>Back to Login</Button>
              <br/><br/>
                <Signup/>
              </ModalBody>
            </Modal>
          </div>
            signupModalFlag=false;
          }
          if(loginModalFlag)
          {
          redirectVar=    
                <div>
                <Modal isOpen={modalLogin} toggle={this.toggleLogin} >
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
          if(localStorage.getItem('email'))
            navLoader=<NavBarLoggedIn/>;
          else
            navLoader=<NavBarLoggedOut/>;
          return(
            <div className="">
              {redirectVarShop}
              {redirectVar}
              {navLoader}
                <div className="jumbotronDiv">
                <Jumbotron className="jumbotronDiv" fluid>
                <Container fluid className="">
                <h1 className="header display-3">Smart Meter</h1>
                <h6 className="header"></h6>
                <Button className="starterButton" color="primary" onClick={this.goToShop}>Get Starter Kit</Button>
                </Container>
          </Jumbotron>
          </div>
          <div className='containerCards'>
          <div className="cards"> 
          <ModalAddApp/>
            <ApplianceCards/>      
          </div>
          <div className="solarPanel"><br/><SolarPanelCollapser/>
          <Button className="button" color="success" onClick={this.compute}>Compute</Button>
<br/><br/><br/><br/><br/><br/><br/><br/></div>
        </div>
        </div>
          )
      }
  }
  export default Start;

