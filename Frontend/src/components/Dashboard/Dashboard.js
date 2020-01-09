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
import HourlyInfoCollapser from './HourlyInfoCollapser';
import ApplianceInfoCollapser from './ApplianceInfoCollapser';
import ApplianceCostDoughNut from './ApplianceCostDoughnut'
// import ModalAddApp from './ModalAddApp';
// import ApplianceCards from './ApplianceCards';
// import SolarPanelCollapser from './SolarPanelCollapser';
import NavBarLoggedIn from '../Navbar/NavBarLoggedIn';
import '../Dashboard/Dashboard.css';

let scheduleCard=null, costToPayCard=null, hourlyInfoCard=null, respData=null, doughnutClass=null;
let redirectVar=null, loginModalFlag=false, modalLogin=false, modalSignup=false, signupModalFlag=false, dashboardFlag=false, goToShopFlag=false, goToPastFlag=false;
  class Dashboard extends React.Component{

    goToShop=()=>{
      goToShopFlag=true;
      this.setState({})
    }
    goToPast=()=>{
      goToPastFlag=true;
      this.setState({})
    }
    toggleHourlyCard=()=>{
      // isHourCardOpen=!isHourCardOpen;
      this.setState({isHourCardOpen:!this.state.isHourCardOpen});
    }
    constructor(props){
        super(props);
        this.state={isHourCardOpen:false}
        let cardDetails=JSON.parse(localStorage.getItem('cardData'));
        if(cardDetails!=null)
        for(let item of cardDetails)
        {
          let prefTime=item['prefTime']
          let newTime='';
          if(prefTime=='12 AM - 07 AM')
            newTime='0 - 7'
          else if(prefTime=='08 AM - 02 PM')
            newTime='8 - 14'
          else if(prefTime=='03 PM - 07 PM')
            newTime='15 - 19'
          else if(prefTime=='08 PM - 11 PM')
            newTime='20 - 23'
          else if(prefTime=='No Preference')
            newTime=''
          let presTime=item['presentTime'].split(' ')[0]
          if(item['presentTime'] === '12 AM')
            presTime = '0'
          else if(item['presentTime'].split(' ')[1] === 'PM')
          {
              if(item['presentTime'].split(' ')[0] !== '12')
              {
                let convPresTime= parseInt(item['presentTime'].split(' ')[0]) + 12
                presTime = convPresTime.toString()
              }
          }
          item['presentTime']=presTime
          item['prefTime']=newTime
        }
        
        let solarPanelArea=JSON.parse(localStorage.getItem('solarArea'));
        if(solarPanelArea==null)
        solarPanelArea=""
        let data={"appliance info":cardDetails,"solarPanelInfo":solarPanelArea};
        console.log('the axios call data',data);

        axios.defaults.withCredentials = false;//very imp, sets credentials so that backend can load cookies
        axios.post("http://184.172.234.236:30601/schedule", data)
        .then(response => {
          console.log('resp',response.data)
          // save new computation only if we come from compute
          // finding if we come from compute is we localStorage's callPSO item is set to true
          if(localStorage.getItem('callPSO')==='true')
          {
              console.log('Coming from Compute So saving new computation result')
              // this.setState({});
              respData=response.data
              console.log(respData['schedule'])
              console.log('===>',respData)
              localStorage.setItem('computationResults',JSON.stringify(respData))
              //axios call to aditya, will give the 'response'
              let data1={
                psoResult:respData,
                email:localStorage.getItem('email')
              }
              axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
              axios.post(hostedAddress+":3001/compute/storeResults", data1)
              .then(response => {
                console.log('aditya ka response',response.data)
                localStorage.setItem('allSchedulesArray',JSON.stringify(response.data['allSchedule']))  
              })
              .catch(res=>{
                  alert('UNABLE TO SAVE DATA INTO DB');
              })
              localStorage.setItem('callPSO','false')
          }
          else{
            console.log('Not Coming from Compute So using previous computation result from local storage')
              respData = JSON.parse(localStorage.getItem('computationResults'))
          }
          if(respData!=null)
            doughnutClass=<ApplianceCostDoughNut scheduleInfo={respData}/>
        let schedule=respData['schedule'];
        let newCost=respData['new cost'];
        let oldCost=respData['old cost'];
        let profit=respData['profit'];
        let hourlyInfo=respData['hourly info'];

        console.log('sch-',schedule);
        let arr=[];
        if(schedule!=null)
        for(let item in schedule)
        {
          console.log(item)
          let brr=[];
          brr.push(item);
          brr.push(schedule[item]);
          arr.push(brr);
        }
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
            <span className='leftCardText'>{item[0]}</span><span className='hideText'>.</span><span className='rightCardText'><b>{time}</b></span>
            </CardText>)
        })

        scheduleCard=<div>
      <Card className="schCard">
        <CardBody>
          <CardTitle><h3>Schedule ({JSON.parse(localStorage.getItem('computationResults'))['computedDate']})</h3></CardTitle>
            {CardDets}
        </CardBody>
      </Card>
    </div>

    costToPayCard=<div>    
    <Card className="schCard">
    <CardBody>
      <CardTitle><h3>Cost</h3></CardTitle>
<div>New Cost You Pay: <b>${newCost}</b>  </div>
<div>Old Cost You were Paying: <b>${oldCost}</b>  </div>
<div>Total Savings: <b>${profit}</b>  </div>
    </CardBody>
  </Card></div>
  this.setState({})
        }).catch(res=>{
            //alert('ERROR IN CALL TO PSO');
            console.log('ERROR IN CALL TO PSO')
        })
        
    }
      render()
      {
          console.log('in render of dashboard')
          if(!localStorage.getItem('email'))
            redirectVar=<Redirect to="/start"/> 
          else if(goToShopFlag)
            {
              redirectVar=<Redirect to="/shop"/>;
              goToShopFlag=false;
            }
            else if(goToPastFlag)
            {
              redirectVar=<Redirect to="/pastSchedules"/>;
              goToPastFlag=false;
            }
            {
                /*
                    if(localStorage.getItem('computationResults')!=null)
                      doughnutClass=<ApplianceCostDoughNut scheduleInfo={JSON.parse(localStorage.getItem('computationResults'))}/>
                */
            }
          return(
            <div className="">
              {redirectVar}
              <NavBarLoggedIn/>
                <div className="jumbotronDiv">
                <Jumbotron className="jumbotronDiv" fluid>
                <Container fluid className="">
                <h1 className="header display-3">Dashboard</h1>
                <h6 className="header"></h6>
                <Button className="starterButton" color="primary" onClick={this.goToPast}>View Past Schedules</Button>
                <Button className="starterButton" color="primary" onClick={this.goToShop}>Get Starter Kit</Button>
                </Container>
          </Jumbotron>
          <div>
              {doughnutClass}
          </div>
          <div className="scheduleCard">          
            {scheduleCard}
          </div>
            <div className="costToPayCard">          
              {costToPayCard}
            </div>
            
            {/* <div className="hourlyInfoCollapser"> */}
            <div className="toggle1">
              <HourlyInfoCollapser/>
            </div>
            <div className="toggle2">
              <ApplianceInfoCollapser/>
            </div>
          </div>
        </div>
          )
      }
  }
  export default Dashboard;

