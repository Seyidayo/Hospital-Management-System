import React, { Component } from 'react';
import LogoutButton from '../../Navigation/LogoutButton';
import { Link } from 'react-router-dom';

class Patient extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            firstName : ' ',
            lastName : ' ', 
            id : this.props.currentUser,
            age : ' ',
            gender : ' ',
            email : ' ',
            phoneNumber: ' ',
            regNumber : ' ',
            height: ' ',
            weight: ' ',
            health: ' ',
            notes: ' ',
            appointment: ' ',
            prescription: ' ',
            health: ' '
        }
    }


    componentDidMount() {
        fetch('/api/account/details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id
            })
        })
        .then(res => res.json())
        .then(json => {
            if(json.success) {
                this.setState({
                    firstName: json.firstName,
                    lastName: json.lastName,
                    age : json.age,
                    gender : json.gender,
                    email : json.email,
                    phoneNumber: json.phoneNumber,
                    regNumber : json.regNumber,
                    height: json.height,
                    weight: json.weight,                
                });
            }
        })
    
        fetch('/api/account/records', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id : this.state.id
            })
        })
        .then(res => res.json())
        .then(json => {
            if(json.success) {
                this.setState({
                    notes: json.notes,
                    appointment: json.appointment,
                    health: json.health,
                    prescription: json.prescription,                    
                });
            }
        })
    }

    render(){
        const {
            firstName ,
            lastName ,
            age ,
            gender ,
            email ,
            phoneNumber,
            regNumber ,
            height ,
            weight ,
            notes,
            appointment,
            health,
            prescription,
            id
        } = this.state
        return (
            <div>
                <div className="navbar navbar-default">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>                        
                        </button>
                        <div className="navbar-brand">{firstName} {lastName}</div>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/" className="active">Home</Link></li>
                            <li><Link to={"/book/"+regNumber}>Visit Doctor</Link></li>                                                    
                            <li><Link to={"/setting/"+regNumber}>Settings</Link></li>
                            <li><LogoutButton currentUser={id}/></li>
                        </ul>
                    </div>
                </div>
                
                <div className="container-fluid">
                    <div className="display_background">
                        <div className="row">
                            <div className="col-md-10 col-md-push-1">
                                <div className="panel">
                                    <div className="panel-heading">
                                        <h4>Profile</h4>
                                    </div>
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <img className="img-thumbnail" src={require('../../../../public/assets/img/img.jpg')} width="100%" height="100%" alt="some image" width="100%" height="100%"/>
                                            </div>
                                            <div className="col-md-9 display_text">
                                                <div className="col-md-6">
                                                    <p><b>Name: </b> {firstName} {lastName}</p>
                                                    <p><b>Email: </b> {email}</p>
                                                    <p><b>Age: </b> {age} years</p>
                                                    <p><b>Height: </b> {height}</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p><b>Registration Number: </b> {regNumber}</p>
                                                    <p><b>Phone Number: </b> +234 {phoneNumber}</p>
                                                    <p><b>Gender: </b> {gender}</p>
                                                    <p><b>Weight: </b> {weight} Kg</p>                                            
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-md-10 col-md-push-1">
                                <div className="panel">
                                    <div className="panel-heading">
                                        <h4>Medical Profile</h4>
                                    </div>
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="col-md-6">
                                                    <p><b>Health History: </b> {health}</p>
                                                    <p><b>Doctor's Advice: </b> {notes}</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p><b>Doctor Appointment: </b> {appointment}</p>
                                                    <p><b>Prescription:</b> {prescription}</p>    
                                                </div>
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
}

export default Patient;