import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card, CardHeader,CardTitle } from 'reactstrap';
import HourlyInfoCards from './HourlyInfoCards'
import '../Dashboard/Dashboard.css';
const HourlyInfoCollapser = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Button className="collapserHourlyBtn" color="success" onClick={toggle} style={{ marginBottom: '1rem' }}>Hourly Information</Button>
      <Collapse isOpen={isOpen} >
        <Card className="hourlyInfoMainCard card mb-4 border-0"> 
          <CardBody >
            <HourlyInfoCards/>
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}

export default HourlyInfoCollapser;