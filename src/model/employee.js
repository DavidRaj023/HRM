const mongoose = require('mongoose');

const Employee = mongoose.model('Employee', {
    empId: {
        type: Number,
        index: true,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        trim: true
    },
    phone: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    doj: {
        type: Date,
        required: true
    },
    salary: {
        type: Number
    }
})

module.exports = Employee;
