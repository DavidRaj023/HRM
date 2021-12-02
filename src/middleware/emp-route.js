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
        const emp = await Employee.find({});
        res.send(emp);
    } catch (e) {
        res.status(500).send(e);
    }
}

const updateEmployee = async (req, res) => {
    const id = req.body.empId;
    console.log(id);
    const updates = ['name', 'phone', 'age'];
    console.log(updates)
    try {
        const emp = await Employee.findOne({empId: id});
        console.log(emp);

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
        console.log(emp);
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
                const emp = await Employee.find({});
                console.log(emp.length);
                res.send(emp);
            } catch (e) {
                res.status(500).send(e);
            }
            break;

        case 'gender':
            try {
                const value = req.body.value;
                console.log('Filter: ' + filter);
                console.log('Value: ' + value);
                const emp = await Employee.find({ gender: value });
                res.send(emp);
            } catch (e) {
                res.status(500).send(e);
            }
            break;

        case 'department':
            try {
                const value = req.body.value;
                console.log('Filter: ' + filter);
                console.log('Value: ' + value);
                const emp = await Employee.find({ department: value });
                res.send(emp);
            } catch (e) {
                res.status(500).send(e);
            }
            break;

        case 'age':
            try {
                const option = req.body.option; 
                const value = req.body.value;
                console.log('Filter: ' + filter + ' Option: ' + option + ' Value: ' + value);
                if(option === 'less_than'){
                    const emp = await Employee.find({ age: { $lt: value } });
                    return res.send(emp);
                }
                const emp = await Employee.find({ age: { $gt: value } });
                res.send(emp);
            } catch (e) {
                res.status(500).send(e);
            }
            break;

        case 'salary':
            try {
                const option = req.body.option; 
                const value = req.body.value;
                console.log('Filter: ' + filter + ' Option: ' + option + ' Value: ' + value);
                if(option === 'less_than'){
                    const emp = await Employee.find({ salary: { $lt: value } });
                    return res.send(emp);
                }
                const emp = await Employee.find({ salary: { $gt: value } });
                res.send(emp);
            } catch (e) {
                res.status(500).send(e);
            }
            break;

        case 'doj':
            try {
                const option = req.body.option; 
                const value = req.body.value;
                console.log('Filter: ' + filter + ' Option: ' + option + ' Value: ' + value);
                if(option === 'before'){
                    const emp = await Employee.find({ doj: { $lt: value } });
                    return res.send(emp);
                }
                const emp = await Employee.find({ doj: { $gt: value } });
                res.send(emp);
            } catch (e) {
                res.status(500).send(e);
            }
            break;

        default:
            res.status(400).send({
                "Message": "This filter is not available"
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