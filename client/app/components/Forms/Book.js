import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { deleteFromStorage } from '../../utils/storage'


class Book extends Component {
    constructor(props){
        super(props);

        this.state = {
            regNumber: this.props.match.params.value,
            concern: '',
            concernNew: '',
            appointment: '',
            errormessage: '',
        }

        this.cancelAppointment =  this.cancelAppointment.bind(this);
        this.submitAppointment = this.submitAppointment.bind(this);
        this.concernTextChange = this.concernTextChange.bind(this)

    }

    componentDidMount(){
        const { regNumber, concern, appointment, errormessage } = this.state

        fetch('/api/account/userappointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                regNumber: regNumber
            })
        })
        .then(res => res.json())
        .then(json => {
            if(json.success) {
                this.setState({
                    concern : json.concern,
                    appointment: json.appointment
                });
            }
        });
    }

    concernTextChange(event){
        this.setState({
            concernNew: event.target.value,
            errormessage: ''
        })
    }

    cancelAppointment(){
        const { regNumber, concern, appointment, errormessage } = this.state
        
        var affirm =  confirm("Confirm?");

        if(affirm) {
            fetch('/api/account/userappointmentdelete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    regNumber: regNumber
                })
            })
            .then(res => res.json())
            .then(json => {
                if(json.success) {
                this.setState({
                    concern: '',
                    appointment: '',
                    errormessage: json.message
                });
                }
            });
            // alert("Ok delete")
        }
        else {
            // alert("close");
        }
    }

    submitAppointment(){
        const { regNumber, concern, concernNew, appointment, errormessage } = this.state
        
        var date = document.getElementById("dateBox").value;
        var affiirm = confirm('Confirm?')

        if(affiirm){
            if(!date || !concernNew) {
                this.setState({
                    errormessage: 'Fields must be filled appropriately'
                })
            }else {
                // alert("Concern:"+ concernNew+", Date: "+date);
                fetch('/api/account/userappointmentsubmit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        regNumber: regNumber,
                        appointment: date,
                        concern: concernNew
                    })
                })
                .then(res => res.json())
                .then(json => {
                    if(json.success) {
                        this.setState({
                            errormessage: json.message
                        });
                    } else {
                        this.setState({
                            errormessage: json.message
                        })
                    }
                });    

                window.location.reload();
            }
        }
    }

    render(){
        const { regNumber, concern, concernNew, appointment, errormessage } = this.state  
        

        if(!concern){
            
            return(
                <div>
                    <div className="navbar navbar-default">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>                        
                            </button>
                            <div className="navbar-brand">Book Appointment</div>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to={"/book/"+regNumber} className="active">Visit Doctor</Link></li>                                                    
                                <li><Link to={"/setting/"+regNumber}>Settings</Link></li>                        
                                <li><Link to="/">LogOut</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="display_background">
                            <div className="row">
                                <div className="col-md-10 col-md-push-1">
                                    <div className="panel">
                                        <div className="panel-heading">
                                            <h4>Book An Appointment</h4>
                                        </div>
                                        <div className="panel-body">
                                            <div className="row">
                                                <div className="col-md-push-3 col-md-6">
                                                    <p>{errormessage}</p>
                                                    <h4>Concern</h4>
                                                    <input 
                                                        type="text"
                                                        value={concernNew}
                                                        onChange={this.concernTextChange}
                                                    />
                                                    <h4>Date</h4>
                                                    <input  
                                                        type="date" 
                                                        id="dateBox"
                                                        name="dateBox"
                                                        min = "2018-07-24"
                                                        max = "2018-12-31"
                                                    />
                                                    <button onClick={this.submitAppointment} className="btn pull-right">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return(
            <div>
                <div className="navbar navbar-default">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>                        
                        </button>
                        <div className="navbar-brand">Book Appointment</div>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to={"/book/"+regNumber} className="active">Visit Doctor</Link></li>                                                    
                            <li><Link to={"/setting/"+regNumber}>Settings</Link></li>                        
                            <li><Link to="/">LogOut</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="display_background">
                        <div className="row">
                            <div className="col-md-10 col-md-push-1">
                                <div className="panel">
                                    <div className="panel-body">
                                        <p>{errormessage}</p>
                                        <p><b>Next Appointment</b> {appointment}</p>
                                        <p><b>Health Concern: </b>{concern}</p>
                                        <button className="btn pull-right" onClick={this.cancelAppointment}>Cancel</button>                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Book;