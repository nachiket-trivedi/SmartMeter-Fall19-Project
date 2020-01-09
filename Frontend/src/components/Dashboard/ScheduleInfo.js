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
    Card, CardBody, CardTitle, CardImg, CardSubtitle, CardText,CardHeader
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
import ApplianceCostDoughNut from './ApplianceCostDoughnut'
import '../Dashboard/Dashboard.css';

let scheduleCard=null,costToPayCard=null,hourlyInfoCard=null;
let cards=null;
let navbar=null, redirectVar=null, loginModalFlag=false,modalLogin=false, modalSignup=false,signupModalFlag=false, dashboardFlag=false, goToShopFlag=false;
  class ScheduleInfo extends React.Component{
    constructor(props){
        super(props);
        let scheduleInfo=JSON.parse(localStorage.getItem('scheduleInfo'))
        console.log('scheduleInfo',scheduleInfo)
        let appInfo=scheduleInfo['appliance info']
        let appNameArr=[]
        let appliCardText=null
        for(let item in appInfo)
        {
            appNameArr.push(item)
        }
        if(appNameArr!=null)
        {
        cards=appNameArr.map(item=>{
            let time=appInfo[item]['Time'];
            if(time==0)
            time="12 AM"
            else if(time<12)
            time=time+" AM"
            else if(time==12)
            time="12 PM"
            else
            time=(time-12)+" PM"
            return (
            <Card>
                <CardHeader>{item}</CardHeader>
                <CardBody>
                <CardText><b>Cost Incurred:</b>$ {appInfo[item]['Cost Incurred']}</CardText>
                <CardText><b>Power Rating:</b> {appInfo[item]['Power Rating in kW']} kW</CardText>
                <CardText><b>Total Running Hours:</b> {appInfo[item]['Total Running Hours']} hrs</CardText>
                <CardText><b>Scheduled Time:</b> {time}</CardText>
                </CardBody>
            </Card>
            );
        })
        }
        this.setState({})    
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
                <h2 className="header display-4">Appliance Info</h2>
                <Button className="detsBtn" color="success" onClick={this.goBack.bind(this)}>Go back</Button>
                <h6 className="header"></h6>
                </Container>
                </Jumbotron>
                <ApplianceCostDoughNut scheduleInfo={JSON.parse(localStorage.getItem('scheduleInfo'))}/>
                <div className='allScheduleCards'>{cards}</div>
            </div>
            </div>
          )
      }
      goBack=(e)=>{
        console.log('Going back from Schedule Info to PastSchedule',e)
        window.location.href='pastSchedules'
    }
  }
  export default ScheduleInfo;

