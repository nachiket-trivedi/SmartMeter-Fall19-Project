import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import signup from './components/signup-old/signup';
import landing from './components/Landing/Landing';
import start from './components/Start/Start';
import dashboard from './components/Dashboard/Dashboard';
import modalLogin from './components/Start/ModalLogin';
import shop from './components/Kit/Shop';
import about from './components/Start/About';
import pastSchedules from './components/Dashboard/PastSchedules';
import scheduleInfo from './components/Dashboard/ScheduleInfo';
import reports from './components/Reports/Reports'

import 'bootstrap/dist/css/bootstrap.css';

class Routes extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={landing}/>
                    <Route exact path="/landing" component={landing}/>
                    <Route exact path="/start" component={start}/>
                    <Route exact path="/signup" component={signup}/>
                    <Route exact path="/dashboard" component={dashboard}/>
                    <Route exact path="/modalLogin" component={modalLogin}/>
                    <Route exact path="/shop" component={shop}/>
                    <Route exact path="/about" component={about}/>
                    <Route exact path="/pastSchedules" component={pastSchedules}/>
                    <Route exact path="/scheduleInfo" component={scheduleInfo}/>
                    <Route exact path='/reports' component={reports}/>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(<Routes />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
