import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import img from '../img.jpg'

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userdetails: [],
            userrecords: [],
            userappointment: [],         
            prescription: '',
            doctorNotes: '',
            healthHistory: '',
            errormessage: '',
            userp : this.props.match.params.value,
        }

        this.prescriptionText = this.prescriptionText.bind(this);
        this.healthHistoryText = this.healthHistoryText.bind(this);
        this.doctorNotesText = this.doctorNotesText.bind(this);
        this.updateRecord = this.updateRecord.bind(this);
    }

    componentDidMount() {
        const {
            userp,
            userrecords,
            userdetails,
            userappointment,
            prescription,
            doctorNotes,
            healthHistory,   
        } = this.state

        fetch('/api/account/profile', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                regNumber: userp
            })
        })
        .then(res => res.json())
        .then(json => {
            if(json.success) {
            this.setState({
                userrecords : json.userRecord,
                userdetails: json.userDetail,
                userappointment: json.userAppointment
            });
            }
        });
    }

    healthHistoryText(event){
        this.setState({
            healthHistory: event.target.value
        })
    }

    doctorNotesText(event){
        this.setState({
            doctorNotes: event.target.value
        })
    }

    prescriptionText(event){
        this.setState({
            prescription: event.target.value
        })
    }

    updateRecord() {
        const {
            prescription,
            healthHistory,
            doctorNotes,
            regNumber,
            userp,
            errormessage
        } = this.state

        if(!healthHistory || !prescription || !doctorNotes){
            this.setState({
                errormessage: "Field Cannot be empty"
            })
        }

        else{
            fetch('/api/account/recordsupdate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    regNumber: userp,
                    healthHistory: healthHistory,
                    doctorNotes: doctorNotes,
                    prescription: prescription
                })
            })
            .then(res => res.json())
            .then(json => {
                if(json.success) {
                    this.setState({
                        errormessage: json.message
                    });
                    window.location.reload();
                } else {
                    this.setState({
                        errormessage: json.message
                    })
                }
            });  
        }
    }

    render(){
        const {
            userp,
            userrecords,
            userdetails,
            userappointment,
            prescription,
            doctorNotes,
            healthHistory,
            errormessage 
        } = this.state

        return(
            <div>
                <div className="container-fluid">
                    <div className="display_background">
                        <div className="row">
                            <div className="col-md-10 col-md-push-1">
                                <div className="panel">
                                    <div className="panel-heading">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <h4>{userdetails.firstName} {userdetails.lastName}</h4>                                
                                            </div>
                                            <div className="col-md-4">
                                                <Link to="/" className="pull-right btn-circle fa fa-chevron-left"></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <img className="img-thumbnail" src={require('../img.jpg')} width="100%" height="100%" alt="some image"/>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="row">
                                                    <h3 ><b>Personal Details</b></h3><br/>
                                                    <div className="col-md-6">
                                                        <p><b>Registration Number: </b> {userdetails.regNumber}</p>                                        
                                                        <p><b>Email: </b> {userdetails.email}</p>
                                                        <p><b>Age: </b> {userdetails.age} years</p>
                                                        <p><b>Height: </b> {userdetails.height}</p>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p><b>Phone Number: </b> +234 {userdetails.phoneNumber}</p>
                                                        <p><b>Gender: </b> {userdetails.gender}</p>
                                                        <p><b>Weight: </b> {userdetails.weight} Kg</p>                                            
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <h3 ><b>Medical Records</b></h3><br/>
                                                    <div className="col-md-6">
                                                        <p><b>Prescription: </b> {userrecords.prescription}</p>                                            
                                                        <p><b>Health History: </b> {userrecords.healthHistory}</p>                                        
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p><b>Appointment: </b> {userappointment.appointmentDate}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <p><b>Past Notes: </b> {userrecords.doctorNotes}</p>
                                                        <button className="btn pull-right" data-toggle="modal" data-target="#myModal">Edit</button>
                                                    </div>

                                                    <div class="modal fade" id="myModal" role="dialog">
                                                        <div class="modal-dialog">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                                    <h4 class="modal-title">Update Records</h4>
                                                                </div>
                                                                <div class="modal-body">
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <p>{errormessage}</p>
                                                                            <p>Health Status</p>
                                                                            <input 
                                                                                type="text"
                                                                                value={healthHistory}
                                                                                onChange={this.healthHistoryText}
                                                                            />
                                                                            <p>Prescribed Meds</p>
                                                                            <input 
                                                                                type="text"
                                                                                value={prescription}
                                                                                onChange={this.prescriptionText}                                                                                
                                                                            />
                                                                            <p>Notes</p>
                                                                            <input 
                                                                                type="text"
                                                                                value={doctorNotes}
                                                                                onChange={this.doctorNotesText}                                                                                
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button class="btn pull-right" data-dismiss="modal">Cancel</button>
                                                                    <button class="btn pull-right" onClick={this.updateRecord} >Submit</button>                                                                    
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
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Profile;