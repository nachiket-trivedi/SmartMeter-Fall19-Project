import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React from 'react';
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {hostedAddress} from '../../GlobalVar'
import NavBarLoggedOut from '../Navbar/NavBarLoggedOut';
import NavBarLoggedIn from '../Navbar/NavBarLoggedIn';
import './Landing.css'
class UserLocationComponent extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={
            stores:[],
            show:false,
            selected_zipcode:''
        }
        this.displayMarkers = this.displayMarkers.bind(this)
        this.handleShow=this.handleShow.bind(this)
        this.handleClose=this.handleClose.bind(this)
    }

    returnsAPIPromise(each) {
        return new Promise((resolve,reject)=>{
            axios.get('https://maps.googleapis.com/maps/api/geocode/json?address='+each+'&sensor=false&key=AIzaSyCGwpKyO_Tm0YCZ5R-Z2eAp9590QB5SOFA')
            .then((response)=>{
                let temp={}
                temp['zipcode']=each
                temp['latitude']=response.data['results'][0]['geometry']['location']['lat']
                temp['longitude']=response.data['results'][0]['geometry']['location']['lng']
                resolve(temp)
            })
        })
    }

    componentWillMount(){
        let data={}
        axios.post(hostedAddress+':3001/compute/getZipCodes',data).then((res)=>{
            console.log(res.data)
            let userRequests=[]
            res.data.forEach((each_data)=>{
                userRequests.push(this.returnsAPIPromise(each_data))
            })
            Promise.all(userRequests).then((allData)=>{
                console.log(allData)
                this.setState({
                    stores:allData
                })
            })
        }).catch((err)=>{
            alert("Error in fetching locations " + err);
        })
    }

    handleShow(store)
    {
        this.setState({
            show:true,
            selected_zipcode:store.zipcode,
        })
    }

    handleClose()
    {
        this.setState({
            show:false
        })
    }

    displayMarkers()
    {
        return this.state.stores.map((store, index) => {
            return <Marker key={index} id={index} position={{
             lat: store.latitude,
             lng: store.longitude
           }}
           onClick={()=>this.handleShow(store)} />
        })
    }

    render(){
        const mapStyles = {
            width: '85%',
            height: '90%',
          };
        return(
            <div className="mapDiv">
                    <Map
                        google={this.props.google}
                        zoom={10}
                        style={mapStyles}
                        initialCenter={{ lat: 37.336240, lng: -121.887060}}>
                        {this.displayMarkers()}
                    </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey:'AIzaSyCGwpKyO_Tm0YCZ5R-Z2eAp9590QB5SOFA'
})(UserLocationComponent)