import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import ApplianceInfoCards from './ApplianceInfoCards'
import '../Dashboard/Dashboard.css';
const ApplianceInfoCollapser = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Button className="collapserHourlyBtn" color="danger" onClick={toggle} style={{ marginBottom: '1rem' }}>Appliance Information</Button>
      <Collapse isOpen={isOpen} >
        <Card className="hourlyInfoMainCard card mb-4 border-0"> 
          <CardBody >
            <ApplianceInfoCards/>
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}

export default ApplianceInfoCollapser;