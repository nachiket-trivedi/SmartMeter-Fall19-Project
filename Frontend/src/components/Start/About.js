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

import axios from 'axios';
import {hostedAddress} from '../../GlobalVar'
import {tempResponse} from '../../GlobalVar'
import "../Start/Start.css"
import React, { useState } from 'react';
import {Redirect} from 'react-router';
// import ModalAddApp from './ModalAddApp';
// import ApplianceCards from './ApplianceCards';
import NavBarLoggedOut from '../Navbar/NavBarLoggedOut';
import NavBarLoggedIn from '../Navbar/NavBarLoggedIn';
import '../Dashboard/Dashboard.css';
import CardLink from 'reactstrap/lib/CardLink';

let scheduleCard=null,costToPayCard=null,hourlyInfoCard=null;
let navbar=null, redirectVar=null, loginModalFlag=false,modalLogin=false, modalSignup=false,signupModalFlag=false, dashboardFlag=false, goToShopFlag=false;
  class About extends React.Component{
    constructor(props){
        super(props);
    }
      render()
      {
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
                      <h1 className="header display-3">Contact Us</h1>
                      <h6 className="header"></h6>
                      </Container>
                    </Jumbotron>
                  </div>
              </div>
              <div>
                <Card>
                <CardImg variant="top" src="https://lh3.googleusercontent.com/Mkclx4NJhkdwuD-XsabMGuWE7cYEiiAHj1D_sPlQvpRgtva6UJDvPLpELZWYhSmXpC9YsUq2-fjD0x6G2wCcRbpHB3q9JZhW5oFrXc8cXyqCJy2aX-jdf_4VWnY1xP-vfvHi1HWN5jXSDOe7OiFhz_n6wylwAu_vjRKSrVXBLlWwGwAOjBFiOBt4I8NMzTQJfahhEfJ1eL5aAwFI0uDOmk1LP_s_qPm50ong6SIJePIYMf_NH22xKbioJNV9dLG7nm9vz0xYiFaWkwRVzMugjbxrv9NoFJS2ygqnzphkoh7ZYTKYCr2oGmuI7rp11ZJIhs4S2e7Um7K24AT_sMdLZ_1-T-kJ5rjerUisZHDNvfucocPjQ80uJfsA6oW76TX5uA3ZtH2RELZ1qQcmUn0IA5sfiG27yLpoejCeRz1yyCSG_y597bT9L9ru4i5901Z6ZgKTmPvxjpbX9QfJK4Vggil0RLH0kWZxGIW16WNgkentKX_-DvmrDxfaHz7LLGexlRH7ChycgNd3TlwKnljNJ7wQgwub193YbwmmlrLqvvk3ItgvmIKb2Kgmtsg_lPrqrE1xfRNPYtLywOtNx-KJMS8OF2uEmWgcaYSoxjXHtG-BSGqJpDT2MiZGU5vQJ7bnTn84eLmHyqJ0drnbfaT084Fjq5-BApsqJiARy1PA37HpeJUPHsY6cJeqK18_qEUwnJ1ILnwhsQgeyjqcRoQiOKwg8lsJ0SHiLQkYcbO9qHXucXEG=w1838-h1378-no"></CardImg>
                  <CardBody>
                      <CardTitle><b>Sarthak Jain</b></CardTitle>
                      <CardSubtitle className="mb-2 text-muted">sarthak.jain@sjsu.edu</CardSubtitle>
                      <CardText>
                        I am a First Year Graduate Student pursuing my MS in Software Engineering.
                        <hr/> 
                        <b>Interests:</b> Cloud Technologies, Full Stack Web Development
                      </CardText>
                    <CardLink href="https://github.com/sarthakjain27">Github</CardLink>
                    <CardLink href="https://www.linkedin.com/in/sarthakssj">LinkedIn</CardLink>
                  </CardBody>
                </Card>
                <Card>
                <CardImg variant="top" src="https://avatars3.githubusercontent.com/u/24610685?s=400&v=4"></CardImg>
                  <CardBody>
                      <CardTitle><b>Nachiket Trivedi</b></CardTitle>
                      <CardSubtitle className="mb-2 text-muted">nachiket.trivedi@sjsu.edu</CardSubtitle>
                      <CardText>
                        I am a First Year Graduate Student pursuing my MS in Software Engineering.
                        <hr/> 
                        <b>Interests:</b> Cloud Technologies, Full Stack Web Development
                      </CardText>
                    <CardLink href="https://github.com/nachiket-trivedi">Github</CardLink>
                    <CardLink href="https://www.linkedin.com/in/nachiket-trivedi-68aab4135">LinkedIn</CardLink>
                  </CardBody>
                </Card>
                <Card>
                <CardImg variant="top" src="https://media.licdn.com/dms/image/C4D03AQHqwLWxc31-Iw/profile-displayphoto-shrink_800_800/0?e=1580947200&v=beta&t=liWLck44gaS7KMrwL4uNYF3euxYEsi8rotdkuVP3B9g"></CardImg>
                  <CardBody>
                      <CardTitle><b>Aditya Mantri</b></CardTitle>
                      <CardSubtitle className="mb-2 text-muted">aditya.mantri@sjsu.edu</CardSubtitle>
                      <CardText>
                        I am a First Year Graduate Student pursuing my MS in Software Engineering.
                        <hr/> 
                        <b>Interests:</b> Cloud Technologies, Full Stack Web Development
                      </CardText>
                    <CardLink href="https://github.com/adityamantri">Github</CardLink>
                    <CardLink href="https://www.linkedin.com/in/mantriaditya">LinkedIn</CardLink>
                  </CardBody>
                </Card>
                <Card>
                <CardImg variant="top" src="https://avatars2.githubusercontent.com/u/24526177?s=400&v=4"></CardImg>
                  <CardBody>
                      <CardTitle><b>Nishant Jani</b></CardTitle>
                      <CardSubtitle className="mb-2 text-muted">nishant.jani@sjsu.edu</CardSubtitle>
                      <CardText>
                        I am a First Year Graduate Student pursuing my MS in Software Engineering.
                        <hr/> 
                        <b>Interests:</b> Cloud Technologies
                      </CardText>
                    <CardLink href="https://github.com/NishantKJani">Github</CardLink>
                    <CardLink href="https://www.linkedin.com/in/nishant-jani">LinkedIn</CardLink>
                  </CardBody>
                </Card>
              </div>
            </div>
        )}
  }
  export default About;

