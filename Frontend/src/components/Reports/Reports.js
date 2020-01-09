import React from 'react'
import {Doughnut} from 'react-chartjs-2';
import axios from 'axios';
import {hostedAddress} from '../../GlobalVar'
import Savings from './Savings'
import './Reports.css'
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
import NavBarLoggedOut from '../Navbar/NavBarLoggedOut';
import NavBarLoggedIn from '../Navbar/NavBarLoggedIn';

let navbar=null
class ReportComponent extends React.Component{

    constructor(props)
    {
        super(props)
        this.state = {
            data:{}
        }
    }
    componentWillMount(){
        let data={email:localStorage.getItem('email')}
        axios.post(hostedAddress+':3001/compute/getApplianceCosts',data).
        then((response)=>{
            let bc=[]
            for(let each in response.data['applianceName'])
            {
                let c= "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
                bc.push(c)
            }
            this.setState({
                data:{
                    labels:response.data['applianceName'],
                    datasets:[{
                        data:response.data['total'],
                        backgroundColor:bc,
                        hoverBackgroundColor:bc
                    }]
                }
            })
        })
    }

    render(){
        if(localStorage.getItem('email'))
        navbar=<NavBarLoggedIn/>
     else
        navbar=<NavBarLoggedOut/>
      return(
          <div>
        <div className="">
            {navbar}
            <div className="jumbotronDiv">
            <Jumbotron className="jumbotronDiv" fluid>
            <Container fluid className="">
            <h1 className="header display-3">Usage Reports</h1>
            <h6 className="header"></h6>
            </Container>
            </Jumbotron>
        </div>
        </div>
                <div>
                <h2>Total Appliance Costs</h2>
                    <Doughnut data={this.state.data} 
                            width={100}
                            height={45}
                            options={{ maintainAspectRatio: true }}/>
                </div>
                <div>
                    <Savings />
                </div>
            </div>
        )
    }
}

export default ReportComponent