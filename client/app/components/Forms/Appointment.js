import React, { Component } from 'react';
import { DoctorsAppointment } from './Users'
import { Link } from 'react-router-dom'

class Appointment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            all: []
        }

        this.loadAll = this.loadAll.bind(this)
        this.loadCurrent = this.loadCurrent.bind(this)        
    }

    componentDidMount(){
        var d = new Date
        var dd =  d.getDate();
        var mm = d.getMonth()+1;
        var yyyy = d.getFullYear();

        if(dd < 10) {
            dd = "0"+dd;
        }

        if(mm < 10) {
            mm = "0"+mm;
        }

        var current = yyyy+"-"+mm+"-"+dd
        const { all } = this.state

        fetch('/api/account/appointmenttoday', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: current
            })
        })
        .then(res => res.json())
        .then(json => {
            if(json.success) {
            this.setState({
                all: json.model
            });
            }
        });
    }

    loadAll() {
        const { all } = this.state;
        
        fetch('/api/account/appointment')
        .then(res => res.json())
        .then(json => {
            if(json.success) {
            this.setState({
                all: json.model
            });
            }
        });
    }

    loadCurrent() {
        var d = new Date
        var dd =  d.getDate();
        var mm = d.getMonth()+1;
        var yyyy = d.getFullYear();

        if(dd < 10) {
            dd = "0"+dd;
        }

        if(mm < 10) {
            mm = "0"+mm;
        }

        var current = yyyy+"-"+mm+"-"+dd
        const { all } = this.state

        fetch('/api/account/appointmenttoday', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: current
            })
        })
        .then(res => res.json())
        .then(json => {
            if(json.success) {
            this.setState({
                all: json.model
            });
            }
        });
    }

    render(){
        const { all } = this.state;

        return(
            <div>
                <div className="navbar navbar-default">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>                        
                        </button>
                        <div className="navbar-brand">Doctors Appointments</div>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/">Patients</Link></li>
                            <li><Link to="/appointment" className="active">Appointments</Link></li>                                
                            <li><Link to="/">LogOut</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="display_background">
                        <div className="row">
                            <div className="col-md-4 col-md-push-8">
                                <button className="btn btn-search pull-right" onClick={this.loadAll}> All</button>
                                <button className="btn btn-search pull-right" onClick={this.loadCurrent}> Today</button>                                
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-10 col-md-push-1">
                                <DoctorsAppointment Arr={all} />                        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Appointment;
