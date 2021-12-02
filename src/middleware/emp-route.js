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

// //Get employees
// router.get('api/v1/employees', async (req, res) => {
//     try {
//         const emp = await Employee.find({});
//         res.status(200).send(emp);
//     } catch (e) {
//         res.status(500).send(e);
//     }
// })

// //Update Task
// router.post('api/v1/edit-employee', async (req, res) => {
//     const _id = req.body.id;
//     const updates = Object.keys(req.body);
//     try {
//         const task = await Task.findById(req.body._id);
//         console.log(req.body._id);

//         updates.forEach((update) => task[update] = req.body[update]);
//         await task.save();

//         if(!task){
//             return res.status(404).send();
//         }
//         res.send(task);
//     } catch (e) {
//         res.status(500).send(e);
//     }
// })

//Delete User
router.post('/api/v1/remove-employee', async (req, res) => {
    const id = req.body.empId;
    console.log(id)
    try {
        const emp = await Employee.findOneAndDelete(id);
        console.log(emp)
        if(!emp){
            return res.status(404).send();
        }
        res.send(emp);
    } catch (e) {
        res.status(500).send(e);
    }
})


module.exports = router;