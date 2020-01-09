import React, { useState } from 'react';
import { Collapse, CardBody, Card , Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';



const SolarPanelCollapser = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const toggleCollapse= () => setIsOpen(!isOpen);
  const solarAreaHandler = (e) => {
    localStorage.setItem('solarArea',e.target.value);
  }
  return (
    <div>
      <Button className="button" color="info" onClick={toggle} style={{ marginBottom: '1rem' }}>Have Solar Panel?</Button>
      <Collapse className="button" isOpen={isOpen}>
          <FormGroup className="button" row>
        <Label for="exampleEmail" sm={2}> Area</Label>
        <Col sm={30}>
          <Input type="email"  onChange={solarAreaHandler} name="email" id="exampleEmail" placeholder="x sq. m" /> 
        </Col>
      </FormGroup>
      </Collapse>

    </div>
  );
}

export default SolarPanelCollapser;