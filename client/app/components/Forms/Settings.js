import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { deleteFromStorage } from '../../utils/storage'

class Setting extends Component {
    constructor(props){
        super(props);

        this.state = {
            regNumber: this.props.match.params.value,
            oldPass: '',
            newPass: '',
            oldPassword: '',
            newPassword: '',
            changeValidation: 'Enter Your Passwords'
        }

        this.oldPasswordChange = this.oldPasswordChange.bind(this);
        this.newPasswordChange = this.newPasswordChange.bind(this);
        this.newPassChange = this.newPassChange.bind(this);
        this.checkPs = this.checkPs.bind(this);        
    }

    componentDidMount(){
        const {
            regNumber
        } = this.state

        fetch('/api/account/fetchPassword', {
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
                oldPass: json.password
            });
            }
        });
    }

    oldPasswordChange(event) {
        this.setState({
            oldPassword: event.target.value
        })
    }
    
    newPasswordChange(event) {
        this.setState({
            newPassword: event.target.value
        })
    }

    newPassChange(event) {
        this.setState({
            newPass: event.target.value
        })
    }

    checkPs() {
        var affirm = confirm("Confirm?");
        if(affirm){
            const {
                oldPassword,
                newPassword,
                oldPass,
                newPass,
                changeValidation,
                regNumber
            } = this.state

            if(oldPass === oldPassword && newPassword === newPass) {
                fetch('/api/account/changePassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        newPassword : newPassword,
                        regNumber: regNumber
                    })
                })
                .then(res => res.json())
                .then(json => {
                    if(json.success){
                        this.setState({
                            changeValidation: json.message
                        })
                        deleteFromStorage('the_main_app');
                        window.location.reload();
                    }
                    else {
                        this.setState({
                            changeValidation: json.message
                        })
                    }
                })
            }
            else {
                this.setState({
                    changeValidation: "Passwords Do Not Match"
                })
            }
        }        
    }

    render(){
        const {oldPassword, newPassword, regNumber, newPass, changeValidation } = this.state;
        return(
            <div>
                <div className="navbar navbar-default">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>                        
                        </button>
                        <div className="navbar-brand">Settings</div>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to={"/book/"+regNumber}>Visit Doctor</Link></li>                                                    
                            <li><Link to={"/setting/"+regNumber} className="active">Settings</Link></li>                        
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
                                        <h4>Change Password</h4>
                                    </div>
                                    <div className="panel-body">
                                        <div className="col-md-3"></div>
                                        <div className="col-md-6">
                                            {changeValidation}
                                            <h4>Old Password</h4>                                    
                                            <input 
                                                type="password" 
                                                onChange = {this.oldPasswordChange} 
                                                value={oldPassword}           
                                            />
                                            <h4>New Password</h4>
                                            <input 
                                                type="password" 
                                                onChange = {this.newPassChange}            
                                                value={newPass}
                                            />
                                            <h4>New Password Again</h4>
                                            <input 
                                                type="password" 
                                                onChange = {this.newPasswordChange}            
                                                value={newPassword}
                                            />
                                            <button className="btn" onClick={this.checkPs}>Submit</button>
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

export default Setting;