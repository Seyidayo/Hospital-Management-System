import React, { Component } from 'react';
import 'whatwg-fetch';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signUpError: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpEmail: '',
      signUpPhoneNumber: '',
      signUpAge: '',
      signUpGender: '',
      signUpHeight: '',
      signUpWeight: '',
    };

    this.onSignUpFirstNameChange = this.onSignUpFirstNameChange.bind(this);
    this.onSignUpLastNameChange = this.onSignUpLastNameChange.bind(this);
    this.onSignUpEmailChange = this.onSignUpEmailChange.bind(this);
    this.onSignUpPhoneNumberChange = this.onSignUpPhoneNumberChange.bind(this);
    this.onSignUpWeightChange = this.onSignUpWeightChange.bind(this);
    this.onSignUpHeightChange = this.onSignUpHeightChange.bind(this);
    this.onSignUpGenderChange = this.onSignUpGenderChange.bind(this);
    this.onSignUpAgeChange = this.onSignUpAgeChange.bind(this);

    this.onSignUpClick = this.onSignUpClick.bind(this);    

  }

  onSignUpFirstNameChange(event) {
    this.setState({
      signUpFirstName: event.target.value
    })
  }

  onSignUpLastNameChange(event) {
    this.setState({
      signUpLastName: event.target.value
    })
  }

  onSignUpEmailChange(event) {
    this.setState({
      signUpEmail: event.target.value
    })
  }

  onSignUpPhoneNumberChange(event) {
    this.setState({
      signUpPhoneNumber: event.target.value
    })
  }

  onSignUpGenderChange(event) {
    this.setState({
      signUpGender: event.target.value
    })
  }

  onSignUpAgeChange(event) {
    this.setState({
      signUpAge: event.target.value
    })
  }

  onSignUpHeightChange(event) {
    this.setState({
      signUpHeight: event.target.value
    })
  }

  onSignUpWeightChange(event) {
    this.setState({
      signUpWeight: event.target.value
    })
  }

  onSignUpClick() {

    var affirm = confirm('Confirm?')
    if(affirm){
      const {
        signUpFirstName,
        signUpLastName,
        signUpEmail,
        signUpPhoneNumber,
        signUpAge,
        signUpGender,
        signUpHeight,
        signUpWeight,
        
      } = this.state;

      fetch('/api/account/register', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: signUpFirstName,
          lastName: signUpLastName,
          email: signUpEmail,
          phoneNumber: signUpPhoneNumber,
          age: signUpAge,
          gender: signUpGender,
          height: signUpHeight,
          weight: signUpWeight,
          
        })
      })
      .then(res => res.json())
      .then(json => {
        if(json.success) {
          this.setState({
            signUpError: json.message,
          });
        }
      });
    }

  }

  render() {
    const {
		isLoading,
		signUpFirstName,
		signUpLastName,
		signUpEmail,
		signUpPhoneNumber,
		signUpAge,
		signUpGender,
		signUpHeight,
		signUpWeight,
		signUpError
    } = this.state;

    return (
        <div>
            <div>
            	<p>{signUpError}</p>
            </div>   

            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <h4>First Name</h4>
                  <input 
                    type="text" 
                    onChange = {this.onSignUpFirstNameChange} 
                    value={signUpFirstName}           
                  />
                </div>
                <div className="col-md-6">
                  <h4>Last Name</h4>
                  <input 
                    type="text" 
                    onChange = {this.onSignUpLastNameChange}            
                    value={signUpLastName}
                  />
                </div>					
              </div>

              <div className="row">
                <div className="col-md-6">
                  <h4>Email Address</h4>
                  <input 
                    type="email" 
                    onChange = {this.onSignUpEmailChange}            
                    value={signUpEmail}
                  />
                </div>
                <div className="col-md-6">
                  <h4>Phone Number</h4>
                  <input 
                    type="text" 
                    onChange = {this.onSignUpPhoneNumberChange}            
                    value={signUpPhoneNumber}
                  />
                </div>					
              </div>

              <div className="row">
                <div className="col-md-6">
                  <h4>Age</h4>
                  <input 
                    type="text" 
                    onChange = {this.onSignUpAgeChange} 
                    value={signUpAge}           
                  />
                </div>
                <div className="col-md-6">
                  <h4>Sex</h4>
                  <input 
                    type="text" 
                    onChange = {this.onSignUpGenderChange}            
                    value={signUpGender}
                  />
                </div>					
              </div>

              <div className="row">
                <div className="col-md-6">
                  <h4>Height</h4>
                  <input 
                    type="text" 
                    onChange = {this.onSignUpHeightChange}            
                    value={signUpHeight}
                  />
                </div>
                <div className="col-md-6">
                  <h4>Weight</h4>
                  <input 
                    type="text" 
                    onChange = {this.onSignUpWeightChange}            
                    value={signUpWeight}
                  />
                </div>					
              </div>

              <div className="row">
                <button className="btn pull-right" onClick={this.onSignUpClick}>Submit</button>					
              </div>
            </div>     
        </div>
    )
  }
}

export default SignUp;
