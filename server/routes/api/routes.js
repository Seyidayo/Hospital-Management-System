var Model = require('../../models')

module.exports = (app) => {

    app.get('/api/account/allusers', (req, res, next) => {

        var userModel = {
            user: []
        }

        Model.User.find({status: "patient" },{},{sort:{firstName: 1}}, function(err, users){
            if(err) {
                return res.send({
                    success: false,
                    message: "Error: Invalid"
                })
            }

           
            return res.send({
                success: true,
                message: "Contacts Loaded",
                model: users
            })
        })
    })

    app.get('/api/account/appointment', (req, res, next) => {
        var userModel = {
            user: []
        }

        Model.DoctorAppointment.find({}, function(err, users){
            if(err) {
                return res.send({
                    success: false,
                    message: "Error: Invalid"
                })
            }

           
            return res.send({
                success: true,
                message: "Contacts Loaded",
                model: users
            })
        })
    })

    app.post('/api/account/appointmenttoday', (req, res, next) => {
        var date = req.body.date;
        var userModel = {
            user: []
        }

        // return console.log(date)

        Model.DoctorAppointment.find({appointmentDate: date}, function(err, users){
            if(err) {
                return res.send({
                    success: false,
                    message: "Error: Invalid"
                })
            }

            return res.send({
                success: true,
                message: "Contacts Loaded",
                model: users
            })

        })
    })

    app.post('/api/account/changePassword', (req, res, next) => {
        var newPassword = req.body.newPassword;
        var regNumber = req.body.regNumber;

        Model.User.findOneAndUpdate({regNumber: regNumber}, {$set:{ password: newPassword}}, function(err, response){
            if(err) {
                return res.send({
                    success: false,
                    message: "Error: Server Error"
                })
            }

            return res.send({
                success: true,
                message: "Password Change Successful"
            })
        })
    })

    app.post('/api/account/del', (req, res, next) => {
        var regNum = req.body.regNumber

        // return console.log(regNum)

        Model.User.findOneAndRemove({regNumber: regNum}, function(err, user){
            if(err) {
                return res.send({
                    success: false,
                    message: "Not Found"
                })
            }

            res.redirect('/');
        })
    })

    app.post('/api/account/details', (req, res, next) => {
        var id = req.body.id;

        Model.UserSession.find({_id: id}, function(err, users){
            if(err) return res.send({
                success: false,
                message: 'Error: invalid'
            });

            const user = users[0]

            Model.User.find({_id: user.userId}, function (err, user){
                if(err) return res.send({
                    success: false,
                    message: 'Error: invalid'
                });

                const currentUser = user[0];

                if(currentUser.status === "patient") {
                    return res.send({
                        success: true,
                        message: 'Found the user',
                        firstName: currentUser.firstName,
                        lastName: currentUser.lastName,
                        regNumber: currentUser.regNumber,
                        email: currentUser.email,
                        phoneNumber: currentUser.phoneNumber,
                        gender: currentUser.gender,
                        age: currentUser.age,
                        height: currentUser.height,
                        weight: currentUser.weight,
                    })
                }

                return res.send({
                    success: true,
                    message: 'Found the user',
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                })
            })
        })
    }) 

    app.post('/api/account/fetchPassword', (req, res, next) => {
        var regNumber = req.body.regNumber

        Model.User.find({regNumber: regNumber}, function(err, Users){
            if(err) {
                return res.send({
                    success: false,
                    message: "Error: Server Error"
                })
            }

            const User = Users[0];
            return res.send({
                success: true,
                message: "Found Password",
                password: User.password
            })
        })
    })

    app.post('/api/account/logout', (req, res, next) => {
        //Get the Id
        var id = req.body.id
        
        Model.UserSession.findOneAndRemove({ _id: id, isDeleted: false}, (err, sessions) => {
            if( err ) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                });
            }

            else {
                return res.send({
                    success: true,
                    message: 'Good'
                });
            }
        })
    })

    app.post('/api/account/profile', (req, res, next) => {
        var regNumber = req.body.regNumber;

        Model.User.find({regNumber: regNumber}, function (err, Users){
            if(err) {
                res.send({
                    success: false,
                    message: "Error: Server Error"
                })
            }
            const User = Users[0]

            Model.UserRecord.find({regNumber: regNumber}, function (err, UserRecords){
                if(err) {
                    res.send({
                        success: false,
                        message: "Error: Server Error"
                    })
                }
                

                const UserRecord = UserRecords[0]

                Model.DoctorAppointment.find({regNumber: regNumber}, function(err, Details){
                    if(err) {
                        return res.send({
                            success: false,
                            message: "Error: Server Error"
                        })
                    }

                    const appointment = Details[0];

                    if(!appointment){
                        return res.send({
                            success: true,
                            message: "User Found",
                            userRecord: UserRecord,
                            userDetail: User,
                            userAppointment: "none"
                        })
                    }
                    // return console.log(regNumber)
                    return res.send({
                        success: true,
                        message: "User Found",
                        userRecord: UserRecord,
                        userDetail: User,
                        userAppointment: appointment
                    })
                })
                // return console.log(User + " " + UserRecord)
            })
        })
    }) 

    app.post('/api/account/register', (req, res, next) => { 
        if(!req.body.firstName) {
            return res.send({
                success: false,
                message: "First Name Cant be blank"
            })
        }

        if(!req.body.lastName) {
            return res.send({
                success: false,
                message: "Last Name Cant be blank"
            })
        }

        if(!req.body.email) {
            return res.send({
                success: false,
                message: "Email Address Cant be blank"
            })
        }

        if(!req.body.phoneNumber) {
            return res.send({
                success: false,
                message: "Phone Number Cant be blank"
            })
        }

        var generateUser = function() {
            var possible = '0123456789';
            var newRegNumber = 'patient';

            for(i = 0; i < 4; i++){
                newRegNumber += possible.charAt(Math.floor(Math.random() * possible.length)); 
            }

            Model.User.find({email: req.body.email, regNumber: newRegNumber}, function(err, previousUser){
                if( err ) throw err;
    
                if(previousUser.length > 0) {
                    return res.send({
                        success: false,
                        message: "Account exists"
                    })
                }
    
                else {
                    var newUser = new Model.User({
                        firstName: req.body.firstName,
                        lastName : req.body.lastName,
                        email : req.body.email,
                        phoneNumber: req.body.phoneNumber,
                        regNumber: newRegNumber,
                        age : req.body.age,
                        gender : req.body.gender,
                        height: req.body.height,
                        weight: req.body.weight,
                    })
    
                    newUser.save( function(err, user){
                        if(err){ throw err };
    

                        Model.UserRecord.find({regnumber : newRegNumber}, function(err, record) {
                            if(err) {
                                return res.send({
                                    success: false,
                                    message: 'Error: Server Error'
                                })
                            }

                            if(record > 0){
                                return res.send({
                                    success: false,
                                    message: "Account exists"
                                })
                            }

                            var newRecord = new Model.UserRecord({
                                regNumber: newRegNumber
                            })

                            newRecord.save(function(err, user){
                                if(err){ throw err };
                        
                                
                                return res.send({
                                    success: true,
                                    message: "User Created: " + newRegNumber
                                })
                            })
                        })
    
                    })
                }
            })

        }

        generateUser();
    });

    app.post('/api/account/records', (req, res, next) => {
        var id =  req.body.id
        
        // return console.log(regNumber)
        Model.UserSession.find({_id: id}, function(err, users){
            if(err) return res.send({
                success: false,
                message: 'Error: invalid'
            });

            const user = users[0]
            
            Model.User.find({_id: user.userId}, function (err, user){
                if(err) return res.send({
                    success: false,
                    message: 'Error: invalid'
                });

                const currentUser = user[0];

                Model.UserRecord.find({regNumber: currentUser.regNumber}, function(err, records){
                    if(err) throw err;

                    const currentUserRecords = records[0]

                    Model.DoctorAppointment.find({regNumber: currentUser.regNumber}, function(err, users){
                        if(err) throw err;


                        const Appointment = users[0]                        
                        if(!Appointment) {
                            return res.send({
                                success: true,
                                message: 'records found',
                                notes: currentUserRecords.doctorNotes,
                                appointment: "No Appointment Scheduled",
                                prescription: currentUserRecords.prescription,
                                health: currentUserRecords.healthHistory
                            })
                            // return console.log("Not Available")
                        }
                        
                        return res.send({
                            success: true,
                            message: 'records found',
                            notes: currentUserRecords.doctorNotes,
                            appointment: Appointment.appointmentDate,
                            prescription: currentUserRecords.prescription,
                            health: currentUserRecords.healthHistory
                        })
                        
                        // const Appointment = users[0]                        
                        // return console.log(Appointment)
                    })
                })
            });
        });
    })

    app.post('/api/account/recordsupdate', function(req, res, next){
        var prescription = req.body.prescription,
            health = req.body.healthHistory,
            notes = req.body.doctorNotes,
            regNumber = req.body.regNumber;
        
        Model.UserRecord.update({regNumber: regNumber},{healthHistory: health, doctorNotes: notes, prescription: prescription}, function(err, record){
            if(err) {
                return res.send({
                    success: false,
                    message: "Error: Server Error"
                })
            }

            return res.send({
                success: true,
                message: "Record Safely Updated"
            })

        })
    })

    app.post('/api/account/signin', (req, res, next) => {
        var regNumber = req.body.regNumber,
            password = req.body.password;

        if(!regNumber) {
            return res.send({
                success: false,
                message: 'Registration Number Cannot be blank'
            });
        }

        if(!password) {
            return res.send({
                success: false,
                message: 'Password Cannot be blank'
            });
        }

        Model.User.find({regNumber: regNumber, password: password }, (err, users) => {
            if(err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                });  
            }

            if (users.length != 1) {
                return res.send({
                    success: false,
                    message: 'Username or Password is not correct'
                });
            }

            const user = users[0];

            const userSession = new Model.UserSession();
            userSession.userId = user._id;
            userSession.status = user.status;
            userSession.save((err, doc) => {
                if (err) {
                    throw err;
                    return res.send({
                        success: false,
                        message: 'Error: Server Error'
                    });  
                }

                return res.send({
                    success: true,
                    message: 'Successfully Logged In',
                    token: doc._id,
                    status: doc.status
                });  
            });
        })
    });

    app.post('/api/account/searchusers', (req, res, next) => {
        var searchText = req.body.searchText;

        Model.User.find({firstName: searchText ,status: "patient"}, function(err, users){
            if(err) {
                return res.send({
                    success: false,
                    message: "Error: Invalid"
                })
            }

           
            return res.send({
                success: true,
                message: "Contacts Loaded",
                model: users
            })
        })
    })

    app.post('/api/account/userappointment', (req, res, next) => {
        var regNumber = req.body.regNumber;

        Model.DoctorAppointment.find({regNumber: regNumber}, function(err, Details){
            if(err) {
                return res.send({
                    success: false,
                    message: "Error: Server Error"
                })
            }

            
            const Detail = Details[0];
            if(!Detail){
                return res.send({
                    success: false,
                    message: "No Record"
                })
            }

            return res.send({
                success: true,
                message: "Details Found",
                concern: Detail.concern,
                appointment: Detail.appointmentDate
            })
        })
    })

    app.post('/api/account/userappointmentsubmit', (req, res, next) => {
        var regNumber = req.body.regNumber,
            concern = req.body.concern,
            appointment = req.body.appointment;

        Model.User.find({regNumber: regNumber}, function(err, Users){
            if(err) {
                return res.send({
                    success: false,
                    message: "Error: Server Error"
                })
            }

            const User = Users[0];
            var newAppoinment = new Model.DoctorAppointment({
                regNumber: regNumber,
                firstName: User.firstName,
                lastName: User.lastName,
                appointmentDate: appointment,
                concern: concern
            })

            newAppoinment.save(function(err, success){
                if(err) return res.send({
                    success: false,
                    message: "Error: Try Again Later"
                })
    
                return res.send({
                    success: true,
                    message: "Appoinment Has Been Scheduled"
                })
            })
        })
    })

    app.post('/api/account/userappointmentdelete', (req, res, next) => {
        var regNumber = req.body.regNumber;

        Model.DoctorAppointment.findOneAndRemove({regNumber: regNumber}, function(err){
            if(err) {
                return res.send({
                    success:false,
                    message: "Error: Server Error"
                })
            }

            return res.send({
                success: true,
                message: "Appointment has been deleted"
            })
        })
    })

    app.post('/api/account/verify', (req, res, next) => {
        
        var token = req.body.token
        Model.UserSession.find({ _id: token}, (err, sessions) => {
            if( err ) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                });
            }

            if(sessions === null) {
                return res.send({
                    success: false,
                    message: 'Never have i ever'
                })
            }

            const session = sessions[0]                        
            return res.send({
                success: true,
                message: 'Good',
                status: session.status,
                _id: session._id                   
            });
        })
    })
}