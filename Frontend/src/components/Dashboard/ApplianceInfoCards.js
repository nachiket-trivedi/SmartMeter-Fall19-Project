import React from 'react';
import {
  Card, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody, CardHeader
} from 'reactstrap';
import '../Dashboard/Dashboard.css';

const appInfoCards = (props) => {
  let appInfo
  if(JSON.parse(localStorage.getItem('computationResults'))!=null)
    appInfo=JSON.parse(localStorage.getItem('computationResults'))['appliance info']
let cards=null
let appNameArr=[]
let appliCardText=null
for(let item in appInfo)
{
    appNameArr.push(item)
}
// let timeApplianceObj={}
// for(let item of appNameArr){
//     let appArr=appInfo[item]['appliance']
//     let applianceNames=""
//     for(let item of appArr)
//         applianceNames+=(item+", ")
//     applianceNames=applianceNames.substring(0,applianceNames.length-2)
//     let appliCardText=<CardText><b>Appliances:</b> {applianceNames}</CardText>
//     timeApplianceObj[item]=appliCardText;
// }
// console.log('timeApplianceObj,',timeApplianceObj)

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

  return (
    <div className="cards">{cards}</div>
  );
};

export default appInfoCards;