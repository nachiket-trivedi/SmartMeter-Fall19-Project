import React, { useState } from 'react';
import { setGlobal, useGlobal } from 'reactn';
import { Collapse, CardBody, Card , Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import '../Start/ModalAddApp.css'


const ModalAddApp = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [appName, setAppName] = useState('');
  const [appWattage, setAppWatt] = useState('');
  const [prefTime, setPrefTime] = useState('');
  const [presentTime, setPresentTime] = useState('');
  const [solarArea, setSolarArea] = useState('');


  const nameHandler = (e) => {
    setAppName(e.target.value);
  }
  const wattHandler = (e) => {
    setAppWatt(e.target.value);
  }
  const prefTimeHandler = (e) => {
    if(e.target.value=="No Preference")
      setPrefTime("");
    else
      setPrefTime(e.target.value);
  }
  const presentTimeHandler = (e) => {
    if(e.target.value=="No Preference")
      setPresentTime("");
    else
      setPresentTime(e.target.value);
  }

  const addAppHandler=(e)=>{
    console.log('app name:', appName)
    console.log('app wattage:', appWattage)
    console.log('app preferred time:', prefTime)
    console.log('solar panel area:', solarArea)
    
    let appId=+localStorage.getItem('idGenerator')+ +1;
    localStorage.setItem('idGenerator',appId);
    let data={"appId":appId,"appName":appName,"appWattage":appWattage,"prefTime":prefTime, "presentTime":presentTime}
    let arr=[];
    arr.push(data)
    if(!localStorage.getItem('cardData'))
    {
      localStorage.setItem('cardData',JSON.stringify(arr))
    }
    else
    {
      let brr=[];
      brr=JSON.parse(localStorage.getItem('cardData'));
      console.log('brr--',brr);

      brr.push(data)
      localStorage.setItem('cardData',JSON.stringify(brr))
    }
    console.log('--',(localStorage.getItem('cardData')));
    // toggle()
    window.location.reload()
  }
  const toggle = () => setModal(!modal);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse= () => setIsOpen(!isOpen);
// nameChange=()=>{
    
// }

  return (
    <div>
      <Button color="info" className="button" onClick={toggle}>Add Appliance</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add Appliance</ModalHeader>
        <ModalBody>
        <Form>
      <FormGroup row>
        <Label for="exampleEmail" sm={2}>Appliance Name</Label>
        <Col sm={10}>
        <Input type="select" name="select" onChange={nameHandler} id="exampleSelect">
          <option>-Select your appliance-</option>
          <option>Air Conditioner</option>
          <option>Washing Machine</option>
          <option>Heater</option>
          <option>Dish Washer</option>
          <option>Cloth Dryer</option>
          <option>Iron</option>
          <option>Pool Pump</option>
          <option>Vacuum Cleaner</option>
          <option>Television</option>
        </Input>        
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleEmail2" sm={2}> Wattage</Label>
        <Col sm={10}>
        <Input  type="text" name="select" onChange={wattHandler} id="exampleSelect" placeholder="Enter the appliance wattage">
        </Input>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleEmail2" sm={2}> Preferred Time</Label>
        <Col sm={10}>
        <Input type="select" onChange={prefTimeHandler}  name="select" id="exampleSelect">
          <option>-Select your preferred time-</option>
          <option>12 AM - 07 AM</option>
          <option>08 AM - 02 PM</option>
          <option>03 PM - 07 PM</option>
          <option>08 PM - 11 PM</option>
          <option>No Preference</option>
        </Input>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleEmail2" sm={2}> Present Time</Label>
        <Col sm={10}>
        <Input type="select" onChange={presentTimeHandler}  name="select" id="exampleSelect">
          <option>-Select your present time-</option>
          <option>12 AM</option>
          <option>1 AM</option>
          <option>2 AM</option>
          <option>3 AM</option>
          <option>4 AM</option>
          <option>5 AM</option>
          <option>6 AM</option>
          <option>7 AM</option>
          <option>8 AM</option>
          <option>9 AM</option>
          <option>10 AM</option>
          <option>11 AM</option>
          <option>12 PM</option>
          <option>1 PM</option>
          <option>2 PM</option>
          <option>3 PM</option>
          <option>4 PM</option>
          <option>5 PM</option>
          <option>6 PM</option>
          <option>7 PM</option>
          <option>8 PM</option>
          <option>9 PM</option>
          <option>10 PM</option>
          <option>11 PM</option>
          <option>No Preference</option>
        </Input>
        </Col>
      </FormGroup>

      

    </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={addAppHandler}>Add</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
            {/* <a color="success" href="" onClick={toggle}><img className="addImg" src="https://www.drupal.org/files/project-images/drupal-addtoany-logo.png"></img></a> */}

    </div>
  );
}

export default ModalAddApp;