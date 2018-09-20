import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { getFromStorage, setInStorage } from '../../utils/storage'

import LandingPage from './Intro'

import Doctor from '../Branches/DoctorComponent/Doctor';
import Nurse from '../Branches/NurseComponent/Nurse';
import Patient from '../Branches/PatientComponent/Patient';



class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
		isLoading: true,
		token: '',
		status: '',
		signInError: '',
		signInRegNumber: '',
		signInPassword: '',
		trial : ''
		};

		this.onSignInRegNumberChange = this.onSignInRegNumberChange.bind(this);
		this.onSignInPasswordChange = this.onSignInPasswordChange.bind(this);
		this.onSignInClick = this.onSignInClick.bind(this);

	}

  	componentDidMount() {
		const obj = getFromStorage('the_main_app');
	
	  	if(obj && obj.token) {
			const { token } = obj		
			fetch('/api/account/verify', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					token: token
				})
			})
			.then(res => res.json())
			.then(json => {
				if( json.success) {
				this.setState({
					token: json._id,
					isLoading: false,
					status: json.status,
				});
				}else {
				this.setState({
					token: '',
					isLoading: false,
				})
				}
			});
		}
		else {
			this.setState({
				token: '',
				isLoading: false
			})
		}
 	}

	onSignInRegNumberChange(event) {
			this.setState({
				signInRegNumber: event.target.value,
				signInError: ''				
			})
	}

	onSignInPasswordChange(event) {
			this.setState({
				signInPassword: event.target.value,
				signInError: ''
			})
	}

	onSignInClick() {
		const {
			signInRegNumber,	
			signInPassword,
			signInError
		} = this.state;

		if(signInPassword != '' && signInRegNumber != ''){
			fetch('/api/account/signin', { 
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				regNumber: signInRegNumber,
				password: signInPassword
			})
			})
			.then(res => res.json())
			.then(json => {
				if(json.success) {
					setInStorage('the_main_app', {token: json.token})
					this.setState({
						signInError: json.message,
						token: json.token,
						status: json.status
					});
				}
				else {
					this.setState({
						signInError: json.message,
						signInRegNumber: '',
						signInPassword: '',
					})
				}
			});

		}else {
			this.setState({
				signInError: "Invalid Username or Password"
			})
		}

	}

	render() {
		const {
			isLoading,
			token,
			status,
			signInRegNumber,
			signInPassword,
			signInError
		} = this.state;

		if(isLoading) {
			return(
				<div>
					<p>Loadiiiiiiiiing...</p>
				</div>
			)
		}

		if(!token) {
			return (
				<div>
					<LandingPage />
					<div className="intro_page_2">
						<div className="container">
							<div className="signin_page">
								<h1>Medical Clinic</h1>						
							
								<div className="row">
									<p>{signInError}</p>
									<input 
										type="text" 
										placeholder="Registration Number" 
										value = {signInRegNumber}
										onChange = {this.onSignInRegNumberChange}
									/>
								</div>

								<div className="row">
									<input 
										type="password"
										placeholder="Password" 
										value={signInPassword}
										onChange = {this.onSignInPasswordChange}
									/>
								</div>
								<button className="btn" onClick={this.onSignInClick}> Sign In</button>         			  								
							</div>
						</div>
						<div className="footer">
							<div className="text-center">
							<div className="social_icon">
								<a className="fa fa-facebook"></a>
								<a className="fa fa-twitter"></a>
								<a className="fa fa-youtube"></a>
								<a className="fa fa-google-plus"></a>								
							</div>
							</div>
						</div>
					</div>
				</div>
				
			)
		}
		
		if(status === "nurse") {
			return (
				<div>
					<Nurse currentUser={token} />
				</div>
			);
		}

		if(status === "doctor") {
			return (
				<div>
					<Doctor currentUser={token} />
				</div>
			);
		}

		return (
			<div>
				<Patient currentUser={token} />
			</div>
		)
	}
}

export default Home;
