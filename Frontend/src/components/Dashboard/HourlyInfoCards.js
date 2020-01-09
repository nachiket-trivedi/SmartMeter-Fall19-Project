import React from 'react';
import {
  Card, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody, CardHeader
} from 'reactstrap';
import '../Dashboard/Dashboard.css';

const HourlyInfoCards = (props) => {
  let hourlyInfo
  if(JSON.parse(localStorage.getItem('computationResults'))!=null)
 hourlyInfo=JSON.parse(localStorage.getItem('computationResults'))['hourly info']
let cards=null
let timeArr=[]
let appliCardText=null
for(let item in hourlyInfo)
{
    timeArr.push(item)
}
let timeApplianceObj={}
for(let item of timeArr){
    let appArr=hourlyInfo[item]['appliance']
    let applianceNames=""
    for(let item of appArr)
        applianceNames+=(item+", ")
    applianceNames=applianceNames.substring(0,applianceNames.length-2)
    let appliCardText=<CardText><b>Appliances:</b> {applianceNames}</CardText>
    timeApplianceObj[item]=appliCardText;
}
console.log('timeApplianceObj,',timeApplianceObj)

if(timeArr!=null)
{
 cards=timeArr.map(item=>{
    let time=item;
    if(item==0)
      time="12 AM"
    else if(item<12)
      time=time+" AM"
    else if(item==12)
      time="12 PM"
    else
      time=(time-12)+" PM"
    return (
      <Card>
        <CardHeader>{time}</CardHeader>
        <CardBody>
          {timeApplianceObj[item]}
          <CardText><b>Cost:</b> $ {hourlyInfo[item]['cost']}</CardText>
          <CardText><b>Load:</b> {hourlyInfo[item]['load']}</CardText>
          <CardText><b>Renewable Power Available:</b> {hourlyInfo[item]['renewable power available']}</CardText>
          <CardText><b>Renewable Selling Amount:</b> {hourlyInfo[item]['renewable selling amount']}</CardText>

        </CardBody>
      </Card>
      );
})
}

  return (
    <div className="cards">{cards}</div>
  );
    // <CardGroup>
    //   <Card className="individualHourlyCards">
    //     <CardBody>
    //       <CardTitle>Card title</CardTitle>
    //       <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
    //     </CardBody>
    //   </Card>
    //   <Card className="individualHourlyCards">
    //     <CardBody>
    //       <CardTitle>Card title</CardTitle>
    //       <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
    //     </CardBody>
    //   </Card>
    //   <Card className="individualHourlyCards">
    //     <CardBody>
    //       <CardTitle>Card title</CardTitle>
    //       <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
    //     </CardBody>
    //   </Card>
    // </CardGroup>
};

export default HourlyInfoCards;