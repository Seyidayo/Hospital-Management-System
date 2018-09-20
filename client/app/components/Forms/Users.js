import React, { Component } from 'react';
import DeleteButton from '../Navigation/DeleteButton';
import { Link } from 'react-router-dom';

export const AllUsers = ({Arr}) => {
	
	return (
		<div>
			{
				Arr.map((user, index) => 
					<div key={index}>
						<div className="panel panel-default">
							<div className="panel-body">
								<div className="row">
									<div className="col-md-3">
										<img className="img-thumbnail img-hide" src={require('../../../public/assets/img/img.jpg')} width="100%" height="100%" alt="some image" width="100%" height="100%"/>
									</div>
									<div className="col-md-9 display_text">
										<p><b>Name: </b> {user.firstName} {user.lastName}</p>
										<p><b>Registration Number: </b> {user.regNumber}</p>
										<p><b>Email: </b>{user.email}</p>																				
										<p><b>Phone Number: </b>+234 {user.phoneNumber}</p>
										<DeleteButton user={user.regNumber} />
									</div>
								</div>
							</div>
						</div>
					</div>
				)
			}
		</div>
	)
};

export const DoctorsPatients = ({Arr}) => {
	return (
		<div>
			{
				Arr.map((user, index) => 
					<div key={index}>
					<div className="panel panel-default">
						<div className="panel-body">
							<div className="row">
								<div className="col-md-3">
									<img className="img-thumbnail img-hide" src={require('../../../public/assets/img/img.jpg')} width="100%" height="100%" alt="some image" width="100%" height="100%"/>
								</div>
								<div className="col-md-9 display_text">
									<p><b>Name: </b> {user.firstName} {user.lastName}</p>
									<p><b>Registration Number: </b> {user.regNumber}</p>
									<p><b>Email: </b>{user.email}</p>																				
									<p><b>Phone Number: </b>+234 {user.phoneNumber}</p>
									<Link to={"/profile/"+user.regNumber} className="btn pull-right">View Record</Link>										
								</div>
							</div>
						</div>
					</div>
					</div>
				)
			}
		</div>
	)
};

export const DoctorsAppointment = ({Arr}) => {
	return (
		<div>
			{
				Arr.map((user, index) => 
					<div key={index}>
					<div className="panel panel-default">
						<div className="panel-body">
							<div className="row">
								<div className="col-md-3">
									<img className="img-thumbnail img-hide" src={require('../../../public/assets/img/img.jpg')} width="100%" height="100%" alt="some image" width="100%" height="100%"/>
								</div>
								<div className="col-md-9 display_text">
									<p><b>Name: </b> {user.firstName} {user.lastName}</p>
									<p><b>Registration Number: </b> {user.regNumber}</p>
                                    <p><b>Day:</b> {user.appointmentDate}</p>
								</div>
							</div>
						</div>
					</div>
					</div>
				)
			}
		</div>
	)
};