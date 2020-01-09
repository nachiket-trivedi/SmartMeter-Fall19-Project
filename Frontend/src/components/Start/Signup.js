import React, { Component } from "../../../node_modules/react";
import axios from "../../../node_modules/axios";
import { Redirect } from "../../../node_modules/react-router";
// import "react-dropdown/style.css";
import '../Start/Signup.css';
import {hostedAddress} from "../../GlobalVar";
import "../Start/Signup.css";
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText, Badge } from '../../../node_modules/reactstrap';

let redirectVar = null, dashboardFlag=false;

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
      firstName: this.state.fname,
      lastName: this.state.lname,
      zipCode: this.state.zip,
      address: this.state.address, //*
      city:this.state.city,
      state:this.state.state
    };
    console.log('data',data)
    axios.defaults.withCredentials = true;//very imp
    axios.post(hostedAddress+":3001/login/signupUser", data)
    .then(response => {   
        console.log("Status Code : ", response);
        if (response.status === 201 && response.data!="exists" && response.data!="error") {
          console.log("new user account created-", response.data);
          localStorage.setItem('email',this.state.email);
          localStorage.setItem('fname',this.state.fname);
          localStorage.setItem('bearer-token',response.headers.authorization)
          dashboardFlag=true;
          // this.setState({});
          window.location.reload()
        } 
        else if(response.data=="exists")
        {
            alert("There's already an account associated with this email-id :(");
            this.setState({});
        }
        else
        {
            alert("Invalid");
        }
    })
    .catch (response => {
        alert("Invalid");
        this.setState({});
    })
  };
  render(){
    if(dashboardFlag)
    {
      redirectVar=<Redirect to='/dashboard'/>
      dashboardFlag=false;
    }
  return (
    <div className="outerSignup">
      {redirectVar}
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
      <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St"onChange={this.addressChangeHandler}/>
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
    <br/>
    <Button onClick={this.submitSignup} className="buttonSignin" color="success">Sign Up </Button>
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
          console.log("new User Profile created-");
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
    <div className="rightDiv">
        <Signup/>
    </div>
    </div>
    );
  }
}

export default (Signup);