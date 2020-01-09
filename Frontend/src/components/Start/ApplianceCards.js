import React from 'react';
import { useGlobal } from 'reactn';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardFooter,CardHeader
} from 'reactstrap';
import ModalAddApp from './ModalAddApp';
import '../Start/ApplianceCards.css'


const ApplianceCards = (props) => {
    const remove=(e)=>{
        let data=JSON.parse(localStorage.getItem('cardData'));
        let newArr=[]
        console.log('e',e)
        for(let item of data)
        {
            console.log('item',item)
            if(JSON.stringify(item['appId'])!=JSON.stringify(e))
                newArr.push(item);
        }
        localStorage.setItem('cardData',JSON.stringify(newArr))
        console.log('newArr',newArr)
        window.location.reload();
    }
let appArr=JSON.parse(localStorage.getItem('cardData'))
let cards=null
if(appArr!=null)
{
 cards=appArr.map(item=>{
    return (
      <Card>
        <CardHeader>{item['appName']}</CardHeader>
        <CardBody>
          <CardText>Appliance Wattage: {item['appWattage']} kW</CardText>
          <CardText>Preferred Time: {item['prefTime']}</CardText>
          <CardText>Present Time: {item['presentTime']}</CardText>
        </CardBody>
    <Button clasName="delBtn" color="danger" onClick={()=>remove(item['appId'])}>Remove</Button>
      </Card>
      );
})
}

  return (
    <div className="cards">{cards}</div>
  );
};

export default ApplianceCards;