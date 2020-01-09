import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import "react-dropdown/style.css";
import {hostedAddress} from "../../GlobalVar";
import "./signup.css";
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText, Badge } from 'reactstrap';

let redirectVar = null;

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      password: "",
      email:"",
      lname:"",
      city:"",
      state:"",
      address:"",
      address2:"",
      zip:""
    };
    this.submitSignup = this.submitSignup.bind(this);
  }
  fnameChangeHandler = e => {
    this.setState({
      fname: e.target.value
    });
  };
  lnameChangeHandler = e => {
    this.setState({
      lname: e.target.value
    });
  };
  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };
  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };
  addressChangeHandler = e => {
    this.setState({
      address: e.target.value
    });
  };
  address2ChangeHandler = e => {
    this.setState({
      address2: e.target.value
    });
  };
  cityChangeHandler = e => {
    this.setState({
      city: e.target.value
    });
  };
  stateChangeHandler = e => {
    this.setState({
      state: e.target.value
    });
  };
  zipChangeHandler = e => {
    this.setState({
      zip: e.target.value
    });
  };
  submitSignup = e => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
      fname: this.state.fname,
      lname: this.state.lname,
      zip: this.state.zip,
      address: this.state.address+this.state.address2,
      city:this.state.city,
      state:this.state.state
    };
    console.log('data',data)
    axios.defaults.withCredentials = true;//very imp
    axios.post(hostedAddress+":3001/signup", data)
    .then(response => {   
        console.log("Status Code : ", response);
        if (response.status === 200 && response.data!="exists" && response.data!="error") {
          console.log("new customer created-");
          // console.log(localStorage.getItem('new1'));
          localStorage.setItem('cookie',response.data['cookie']);
          localStorage.setItem('email',response.data['email']);
          localStorage.setItem('name',response.data['name']);
          localStorage.setItem('bearer-token',response.headers.authorization)
          this.setState({
            authFlag: true
          });
        } else if (response.status === 201 && response.data!="exists" && response.data!="error") {
          console.log("new restaurant created-");
          // console.log(localStorage.getItem('cookie'));
          localStorage.setItem('cookie',response.data['cookie']);
          localStorage.setItem('email',response.data['email']);
          localStorage.setItem('name',response.data['name']);
          localStorage.setItem('bearer-token',response.headers.authorization)
          this.setState({
            authFlag: true
          });
        }
        else if(response.data=="exists")
        {
            alert("There's already an account associated with this email-id :(");
            this.setState({
            authFlag: false
        });
        }
        else
        {
            alert("Invalid");
        }
    })
    .catch (response => {
        alert("Invalid");
        this.setState({
          authFlag: false
        });
      }
    )
    // this.props.signup(data);
    // For Redux just uncomment this line, comment the above lines and the rest is as it is.
    // Refer the bhagwan chart for understanding the flow.
 
  };
  render(){
  return (
    <div className="outerSignup">
    <Form >
    <Row form>
      <Col md={6}>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="enter your email" onChange={this.emailChangeHandler}/>
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="enter your password" onChange={this.passwordChangeHandler}/>
        </FormGroup>
      </Col>
    </Row>
    <Row form>
      <Col md={6}>
        <FormGroup>
          <Label for="exampleFName">First Name</Label>
          <Input ref={ref => (this.fname = ref)} type="text" name="fname" id="exampleFName" placeholder="enter your first name" onChange={this.fnameChangeHandler}/>
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label for="exampleLName">Last Name</Label>
          <Input type="text" name="lname" id="exampleLName" placeholder="enter your last name" onChange={this.lnameChangeHandler}/>
        </FormGroup>
      </Col>
    </Row>
    <FormGroup>
      <Label for="exampleAddress">Address</Label>
      <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St"onChange={this.address1ChangeHandler}/>
    </FormGroup>
    <FormGroup>
      <Label for="exampleAddress2">Address 2</Label>
      <Input type="text" name="address2" id="exampleAddress2" placeholder="Apartment, studio, or floor" onChange={this.address2ChangeHandler}/>
    </FormGroup>
    <Row form>
      <Col md={6}>
        <FormGroup>
          <Label for="exampleCity">City</Label>
          <Input type="text" name="city" id="exampleCity" onChange={this.cityChangeHandler}/>
        </FormGroup>
      </Col>
      <Col md={4}>
        <FormGroup>
          <Label for="exampleState">State</Label>
          <Input type="text" name="state" id="exampleState" onChange={this.stateChangeHandler}/>
        </FormGroup>
      </Col>
      <Col md={2}>
        <FormGroup>
          <Label for="exampleZip">Zip</Label>
          <Input type="text" name="zip" id="exampleZip" onChange={this.zipChangeHandler}/>
        </FormGroup>  
      </Col>
    </Row>
    <FormGroup check>
      <Input type="checkbox" name="check" id="exampleCheck"/>
      <Label for="exampleCheck" check>Remember Password</Label>
    </FormGroup>

    <Button onClick={this.submitSignup} className="buttonSignin" color="success">Sign Up</Button>
  </Form>
  </div>
  );
  }
}

class signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      authFlag: false,
      role: ""
    };
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.roleChangeHandler = this.roleChangeHandler.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
  }
  componentWillMount() {
    this.setState({
      authFlag: false
    });
  }
  usernameChangeHandler = e => {
    this.setState({
      username: e.target.value
    });
  };
  roleChangeHandler = value => {
    this.setState({
      role: value
    });
    this.role.value = { value };
  };

  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };
  submitSignup = e => {
    var headers = new Headers();
    e.preventDefault();

    const data = {
      username: this.state.username,
      password: this.state.password,
      role: this.state.role,
      name: this.name.value,
      phone: this.phone.value,
      zipcode: this.zipcode.value
    };
    axios.defaults.withCredentials = true;//very imp
    axios.post(hostedAddress+":3001/signup", data)
    .then(response => {   
        console.log("Status Code : ", response);
        if (response.status === 200 && response.data!="exists" && response.data!="error") {
          console.log("new customer created-");
          // console.log(localStorage.getItem('new1'));
          localStorage.setItem('cookie',response.data['cookie']);
          localStorage.setItem('email',response.data['email']);
          localStorage.setItem('name',response.data['name']);
          localStorage.setItem('bearer-token',response.headers.authorization)
          this.setState({
            authFlag: true
          });
        } else if (response.status === 201 && response.data!="exists" && response.data!="error") {
          console.log("new restaurant created-");
          // console.log(localStorage.getItem('cookie'));
          localStorage.setItem('cookie',response.data['cookie']);
          localStorage.setItem('email',response.data['email']);
          localStorage.setItem('name',response.data['name']);
          localStorage.setItem('bearer-token',response.headers.authorization)
          this.setState({
            authFlag: true
          });
        }
        else if(response.data=="exists")
        {
            alert("There's already an account associated with this email-id :(");
            this.setState({
            authFlag: false
        });
        }
        else
        {
            alert("Invalid");
        }
    })
    .catch (response => {
        alert("Invalid");
        this.setState({
          authFlag: false
        });
      }
    )
    // this.props.signup(data);
    // For Redux just uncomment this line, comment the above lines and the rest is as it is.
    // Refer the bhagwan chart for understanding the flow.
 
  };
  render() {
    // if(!localStorage.getItem('cookie')){
    //     redirectVar = <Redirect to= "/signup"/>
    // }
    // else if(localStorage.getItem('cookie')=='customer')
    // {
    //     redirectVar = <Redirect to= "/home_cust"/>
    // }
    // else if(localStorage.getItem('cookie')=='restaurant')
    // {
    //     redirectVar = <Redirect to= "/home_rest"/>
    // }
    return (
      <div className="mainDiv">
      <div className="leftDiv">
        {/* <img src="http://www.4usky.com/data/out/54/164471960-leaves-wallpapers.jpg"/> */}
        </div>
    <div className="rightDiv">
        <Signup/>
    </div>
    </div>
    );
  }
}

export default (signup);