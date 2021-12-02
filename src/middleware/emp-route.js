const express = require('express');
const Employee = require('../model/employee');
const router = new express.Router();

//Create employees
router.post('/api/v1/employee', async (req, res) =>{
    const emp = new Employee(req.body);
    try {
        await emp.save();
        res.status(201).send(emp);
    } catch (e) {
        res.status(400).send(e);
    }
})

//Get Employees
router.get('/api/v1/employees', async (req, res) => {
    try {
        const emp = await Employee.find({});
        res.send(emp);
    } catch (e) {
        res.status(500).send(e);
    }
})

//Get Employees by fillter
router.post('/api/v1/employees', async (req, res) => {
    const filter = req.body.filter;
    if(filter === 'all'){
        try {
            console.log(filter);
            const emp = await Employee.find({});
            res.send(emp);
        } catch (error) {
            res.status(500).send(e);
        }    
    } else if(filter === 'gender'){
        try {
            const value = req.body.value
            console.log('Filter: ' + filter);
            console.log('Value: ' + value);
            const emp = await Employee.find({ gender: value });
            res.send(emp);
        } catch (error) {
            res.status(500).send(e);
        }    
    } else if(filter === 'department'){
        try {
            const value = req.body.value
            console.log('Filter: ' + filter);
            console.log('Value: ' + value);
            const emp = await Employee.find({ department: value });
            res.send(emp);
        } catch (error) {
            res.status(500).send(e);
        }    
    }
})


// //Update Task
router.post('/api/v1/edit-employee', async (req, res) => {
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
})

//Delete User
router.post('/api/v1/remove-employee', async (req, res) => {
    const id = req.body.empId;
    console.log(id);
    try {
        const emp = await Employee.findOneAndDelete(id);
        console.log(emp);
        if(!emp){
            return res.status(404).send();
        }
        res.send(emp);
    } catch (e) {
        res.status(500).send(e);
    }
})


module.exports = router;