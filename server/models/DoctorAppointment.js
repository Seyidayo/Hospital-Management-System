const moongoose = require('mongoose');

const DoctorAppointmentSchema = new moongoose.Schema({
    firstName: {
        type: String,
        default: ''
    },

    lastName: {
        type: String,
        default: ''
    },
    
    regNumber: {
        type: String,
        default: ''
    },

    appointmentDate: {
        type: String,
        default: ''
    },

    concern: {
        type: String,
        default: ''
    }, 

    availability: {
        type: Boolean,
        default: false
    }

})

module.exports = moongoose.model('DoctorAppointment', DoctorAppointmentSchema);