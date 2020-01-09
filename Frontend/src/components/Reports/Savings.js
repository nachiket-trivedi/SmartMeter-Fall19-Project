import React from 'react'
import {Doughnut} from 'react-chartjs-2';
import axios from 'axios';
import {hostedAddress} from '../../GlobalVar'

class Savings extends React.Component{

    constructor(props)
    {
        super(props)
        this.state = {
            data:{}
        }
    }
    componentDidMount(){
        let data={email:localStorage.getItem('email')}
        axios.post(hostedAddress+':3001/compute/getTotalCost',data).
        then((response)=>{
            let bc=[]
            for(let each in response.data['a'])
            {
                let c= "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
                bc.push(c)
            }
            this.setState({
                data:{
                    labels:response.data['a'],
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
        return(
            <div>
                <h2>Total Savings</h2>
                <Doughnut data={this.state.data} 
                        width={100}
                        height={45}
                        options={{ maintainAspectRatio: true }}
                />
            </div>
        )
    }
}

export default Savings