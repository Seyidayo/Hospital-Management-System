import React from 'react';
import { render } from 'react-dom';


import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './components/App/App';
import NotFound from './components/App/NotFound';
import Home from './components/Home/Home';

import NurseSignUp from './components/Branches/NurseComponent/Nurse1'
import Profile from './components/Forms/Profile'
import Appointment from './components/Forms/Appointment'
import Setting from './components/Forms/Settings'
import Book from './components/Forms/Book'

import './styles/styles.scss';

render((
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path = '/nurse:signup' component={NurseSignUp} />
          <Route path = '/profile/:value' component={Profile} />
          <Route path = '/appointment' component={Appointment} />                  
          <Route path = '/setting/:value' component={Setting} />
          <Route path = '/book/:value' component={Book} />          
          <Route component={NotFound}/>
        </Switch>
      </App>
    </Router>
), document.getElementById('app'));
