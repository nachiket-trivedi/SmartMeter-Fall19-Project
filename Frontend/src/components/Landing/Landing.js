import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Jumbotron,
    Button,
    Container
  } from 'reactstrap';
  import "./Landing.css"
  import React, { useState } from 'react';
  import {Redirect} from 'react-router';
import FooterPage from './Footer'
import GoogleApiWrapper from './UsersLocation'

  const items = [
    {
      src: 'https://images.unsplash.com/photo-1540912795404-ab2ba3137e3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1333&q=80',
    },
    {
      src: 'https://images.unsplash.com/photo-1487875961445-47a00398c267?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    },
    {
      src: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1268&q=80',
    }
  ];
  
  const Example = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
  
    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    }
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    }
  
    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.src}
          className='carouselItem'
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });
  
    return (
      <Carousel 
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    );
  }
  let redirectVar=null;
  class home extends React.Component{
      clickHandler=()=>{
        redirectVar=<Redirect to="/start"/>
        this.setState({})
      }
      render()
      {
          return(
            <div className="outerDiv">
              {redirectVar}
                <div className="jumbotronDiv">
                <Jumbotron fluid>
                <Container fluid>
                  <h1 className="display-3">Smart Meter</h1>
                  <p className="lead">We believe in optimization</p>
                  <p></p>
                <p className="lead">
                  <Button color="success" onClick={this.clickHandler}>Schedule your devices</Button>
                </p>
                </Container>
                </Jumbotron>
                 </div>
                <div className="carouselDiv">
                    <Example/>
                </div>
                <div className='location'>
                  <GoogleApiWrapper />
                </div>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <div className='footer'> 
                <FooterPage/>
                </div>
              </div>
          )
      }
  }
  export default home;

