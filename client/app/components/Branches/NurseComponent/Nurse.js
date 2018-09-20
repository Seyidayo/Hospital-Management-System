import React, { Component } from 'react';

import SignUp from '../../Forms/SignUp';
import LogoutButton from '../../Navigation/LogoutButton'
import { AllUsers } from '../../Forms/Users';

import { Link, Switch, Route } from 'react-router-dom'

class Nurse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '', 
            id: this.props.currentUser,
            model: [],
            searchText: '',            
            renderNow: 'signUp'    
        }

        this.searchRecords = this.searchRecords.bind(this);
        this.searchTextChange = this.searchTextChange.bind(this);
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
                lastName: json.lastName    
            });
            }
        });

        fetch('/api/account/allusers')
        .then(res => res.json())
        .then(json => {
            if(json.success) {
            this.setState({
                model: json.model
            });
            }
        });
    }

    searchRecords() {
        const {
            searchText,
            model,
        } = this.state;

        if(!searchText) {
            fetch('/api/account/allusers')
            .then(res => res.json())
            .then(json => {
                if(json.success) {
                this.setState({
                    model: json.model
                });
                }
            });
        }

        fetch('/api/account/searchusers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                searchText :  searchText
            })
        })
        .then(res => res.json())
        .then(json => {
            if(json.success) {
            this.setState({
                model: json.model
            });
            }
        });

    }

    searchTextChange(event) {
        this.setState({
            searchText:event.target.value
        })
    }

    render(){
        const {
            firstName,
            lastName,
            model,
            renderNow,
            searchText
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
                            <li><Link to="/" className="active">Patients</Link></li>
                            <li><Link to="/appointment">Appointments</Link></li>
                            <li><Link to="/nurse:signup">Registration</Link></li>
                            <li><LogoutButton currentUser={model._id}/></li>
                        </ul>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="display_background">
                        <div className="row">
                            <div className="col-md-4 col-sm-8 col-xs-8 col-md-push-8 col-sm-push-4 col-xs-push-4">
                                <input type="text" placeholder="search Firstname" value={searchText} onChange={this.searchTextChange} className="input-search"/> 
                                <button className="btn btn-search fa fa-search" onClick={this.searchRecords}></button>                                        
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-10 col-md-push-1">
                                <AllUsers Arr={model}/>
                            </div>
                        </div>
                    </div>
                </div>         
            </div>
        )
    }
}

export default Nurse;