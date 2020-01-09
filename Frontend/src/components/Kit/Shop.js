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
    Col,Modal, ModalHeader, ModalBody, ModalFooter,
    Card, CardBody, CardTitle, CardImg, CardSubtitle, CardText
  } from 'reactstrap';


import axios from 'axios';
import {hostedAddress} from '../../GlobalVar'
import {tempResponse} from '../../GlobalVar'
import "../Start/Start.css"
import React, { useState } from 'react';
import {Redirect} from 'react-router';
// import ModalAddApp from './ModalAddApp';
// import ApplianceCards from './ApplianceCards';
import NavBarLoggedOut from '../Navbar/NavBarLoggedOut';
import NavBarLoggedIn from '../Navbar/NavBarLoggedIn';
import '../Dashboard/Dashboard.css';

let scheduleCard=null,costToPayCard=null,hourlyInfoCard=null;
let navbar=null, redirectVar=null, loginModalFlag=false,modalLogin=false, modalSignup=false,signupModalFlag=false, dashboardFlag=false, goToShopFlag=false;
  class Shop extends React.Component{
    constructor(props){
        super(props);
    }
      render()
      {
          if(localStorage.getItem('email'))
            navbar=<NavBarLoggedIn/>
         else
            navbar=<NavBarLoggedOut/>
          return(
            <div className="">
                {navbar}
                
                  <div className="jumbotronDiv">
                    <Jumbotron className="jumbotronDiv" fluid>
                    <Container fluid className="">
                    <h1 className="header display-3">Shop</h1>
                    <h6 className="header"></h6>
                    </Container>
                    </Jumbotron>
                  </div>
            </div>
          )
      }
  }
  export default Shop;

