const express = require('express');
const Employee = require('../model/employee');
const router = new express.Router();

//DAO
const createEmployee = async (req, res) =>{
    const emp = new Employee(req.body);
    try {
        await emp.save();
        res.status(201).send(emp);
    } catch (e) {
        res.status(400).send(e);
    }
}

const getAllEmployees = async (req, res) => {
    try {
        const emp = await Employee.find({}, {_id:0, __v:0});// Select all from table without id and __V filed
        emp.push({ results: emp.length });
        res.send(emp);
    } catch (e) {
        res.status(500).send(e);
    }
}

const updateEmployee = async (req, res) => {
    const id = req.body.empId;
    console.log(id);
    const updates = ['name', 'phone', 'age'];
    try {
        const emp = await Employee.findOne({empId: id});
        if(!emp){
            return res.status(404).send();
        }

        updates.forEach((update) => emp[update] = req.body[update]);
        await emp.save();

        res.send(emp);
    } catch (e) {
        res.status(500).send(e);
    }
}

const deleteEmployee = async (req, res) => {
    const id = req.body.empId;
    console.log(id);
    try {
        const emp = await Employee.findOneAndDelete( {empId: id} );
        if(!emp){
            return res.status(404).send();
        }
        res.send(emp);
    } catch (e) {
        res.status(500).send(e);
    }
}

const getByFilters = async (req, res) => {
    const filter = req.body.filter;
    switch (filter) {
        case 'all':
            try {
                console.log('Filter: ' + filter);
                const emp = await Employee.find({}, {_id:0, __v:0});
                res.send(emp);
            } catch (e) {
                res.status(500).send(e);
            }
            break;

        case 'gender':
            try {
                const value = req.body.value;
                if(!value){
                    return res.status(400).send({
                        Code: '400',
                        Error: 'Please enter the filter values'
                    });
                }
                const emp = await Employee.find({ gender: value }, {_id:0, __v:0});
                if(!emp.length > 0){
                    return res.status(400).send({
                        Message: 'No data found'
                    });
                }
                res.send(emp);
            } catch (e) {
                res.status(500).send(e);
            }
            break;

        case 'department':
            try {
                const value = req.body.value;
                if(!value){
                    return res.status(400).send({
                        Code: '400',
                        Error: 'Please enter the filter values'
                    });
                }
                const emp = await Employee.find({ department: value }, {_id:0, __v:0});
                if(!emp.length > 0){
                    return res.status(400).send({
                        Message: 'No data found'
                    });
                }
                res.send(emp);
            } catch (e) {
                res.status(500).send(e);
            }
            break;

        case 'age':
            try {
                const option = req.body.option; 
                const value = req.body.value;
                if(!option || !value){
                    return res.status(400).send({
                        Code: '400',
                        Error: 'Please enter the filter values and options'
                    });
                }
                console.log('Filter: ' + filter + ' Option: ' + option + ' Value: ' + value);
                let emp = {};
                if(option === 'less_than'){
                    emp = await Employee.find({ age: { $lt: value } }, {_id:0, __v:0});
                }else if(option === 'greater_than'){
                    emp = await Employee.find({ age: { $gt: value } }, {_id:0, __v:0});
                }
                if(!emp.length > 0){
                    return res.status(400).send({
                        Message: 'No data found'
                    });
                }
                res.send(emp);
            } catch (e) {
                res.status(500).send(e);
            }
            break;

        case 'salary':
            try {
                const option = req.body.option; 
                const value = req.body.value;
                if(!option || !value){
                    return res.status(400).send({
                        Code: '400',
                        Error: 'Please enter the filter values and options'
                    });
                }
                console.log('Filter: ' + filter + ' Option: ' + option + ' Value: ' + value);
                let emp = {};
                if(option === 'less_than'){
                    emp = await Employee.find({ salary: { $lt: value } }, {_id:0, __v:0});
                }else if(option === 'greater_than'){
                    emp = await Employee.find({ salary: { $gt: value } }, {_id:0, __v:0});
                }
                if(!emp.length > 0){
                    return res.status(400).send({
                        Message: 'No data found'
                    });
                }
                res.send(emp);
            } catch (e) {
                res.status(500).send(e);
            }
            break;

        case 'doj':
            try {
                const option = req.body.option; 
                const value = req.body.value;
                if(!option || !value){
                    return res.status(400).send({
                        Code: '400',
                        Error: 'Please enter the filter values and options'
                    });
                }
                console.log('Filter: ' + filter + ' Option: ' + option + ' Value: ' + value);
                let emp = {};
                if(option === 'before'){
                    emp = await Employee.find({ doj: { $lt: value } }, {_id:0, __v:0});                    
                }else if(option === 'after'){
                    emp = await Employee.find({ doj: { $gt: value } }, {_id:0, __v:0});
                }
                if(!emp.length > 0){
                    return res.status(400).send({
                        Message: 'No data found'
                    });
                }
                res.send(emp);
            } catch (e) {
                res.status(500).send(e);
            }
            break;

        default:
            res.status(400).send({
                "Message": "This filter is not available: " +filter
            })
            break;
    }
}

//Routers
router.post('/api/v1/employee',createEmployee);
router.get('/api/v1/employees', getAllEmployees);
router.post('/api/v1/edit-employee', updateEmployee);
router.post('/api/v1/remove-employee', deleteEmployee);
router.post('/api/v1/employees', getByFilters);

module.exports = router;