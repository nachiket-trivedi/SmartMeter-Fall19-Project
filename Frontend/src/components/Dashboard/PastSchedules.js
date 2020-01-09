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

let scheduleCard=null,costToPayCard=null,hourlyInfoCard=null, scheduleCards=null;
let navbar=null, redirectVar=null, loginModalFlag=false,modalLogin=false, modalSignup=false,signupModalFlag=false, dashboardFlag=false, goToShopFlag=false, scheduleInfoFlag=false;
  class PastSchedules extends React.Component{
    constructor(props){
        super(props);
        let data={email:localStorage.getItem('email')}
        console.log('data',data)
        axios.defaults.withCredentials = true;//very imp
        axios.post(hostedAddress+":3001/compute/getAllSchedule", data)
        .then(response => {   
        console.log('response.data',response.data)
        let allSchedules=response.data['allSchedule'].reverse()

        console.log('allSchedules',allSchedules)
        if(allSchedules!=undefined || allSchedules!=null)
        scheduleCards=allSchedules.map((element)=>{
        let arr=[]
        let computedDate=element['computedDate']
        for(let item in element['schedule'])
            {
            console.log(item)
            let brr=[];
            brr.push(item);
            brr.push(element['schedule'][item]);
                arr.push(brr);
            }
            console.log('-->',arr)
            let CardDets=arr.map(item=>{
                let time=item[1];
                if(item[1]==0)
                  time="12 AM"
                else if(item[1]<12)
                  time=time+" AM"
                else if(item[1]==12)
                  time="12 PM"
                else
                  time=(time-12)+" PM"
                return(<CardText>
                  <span className='leftCardText'>{item[0]}</span><span className='hideText'>.</span><span className='rightCardText'>{time}</span>
                  </CardText>)
              })
        return(
            <div>
            <Card className="schCard1">
                <CardBody>
                  <CardTitle><h3>{computedDate}</h3></CardTitle>
                      {CardDets}
                      <span className='leftCardText'>Total Schedule Cost</span><span className='hideText'>.</span><span className='rightCardText'>{element['new cost']}</span>
                      <br />
                <Button className="detsBtn" color="success" onClick={this.openDetails.bind(this,element)}>Appliance Level Details</Button>
                </CardBody>
            </Card>
            </div>
        )
        })
        this.setState({})
        })
        .catch((err)=>{
          console.log('err',err)
        })
    }
    openDetails=(e)=>{
        console.log('--deets--',e)
        localStorage.setItem("scheduleInfo",JSON.stringify(e))
        scheduleInfoFlag=true;
        this.setState({})
    }
      render()
      {
          if(localStorage.getItem('email'))
            navbar=<NavBarLoggedIn/>
         else
            navbar=<NavBarLoggedOut/>
        if(scheduleInfoFlag)
            {
                redirectVar=<Redirect to="/scheduleInfo"/>
                scheduleInfoFlag=false
            }
          return(
            <div className="">
                {redirectVar}
                {navbar}
                <div className="jumbotronDiv">
                <Jumbotron className="jumbotronDiv" fluid>
                <Container fluid className="">
                <h1 className="header display-3">Past Schedules</h1>
                <h6 className="header"></h6>
                </Container>
                </Jumbotron>
            </div>
            <div>{scheduleCards}</div>
            </div>
          )
      }
  }
  export default PastSchedules;

