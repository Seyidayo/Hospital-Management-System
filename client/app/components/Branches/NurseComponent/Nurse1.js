import React, { Component } from 'react';

import SignUp from '../../Forms/SignUp';

import { Link, Switch, Route } from 'react-router-dom'

class Nurse1 extends Component {
    constructor(props) {
        super(props);
    }

    currentDate() {
        var d = new Date();
        return(d.toUTCString())
    }

    render(){    
        return (
            <div>
                <div className="navbar navbar-default">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>                        
                        </button>
                        <div className="navbar-brand">Patients Registration</div>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/">Patients</Link></li>
                            <li><Link to="/appointment">Appointments</Link></li>
                            <li><Link to="/nurse:signup" className="active">Registration</Link></li>
                            <li><Link to="/" >LogOut </Link></li>
                        </ul>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="display_background">
                        <div className="row">
                            <div className="col-md-10 col-md-push-1">
                                <SignUp />
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        )
    }
}

export default Nurse1;