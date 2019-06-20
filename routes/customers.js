const router = require('express').Router();
const Customer = require('../models/customer');

router.get('/customers', (req, res) => {
    Customer.find({}, (err, doc) => {
        if(!err)
            res.send(doc)
    });
})
router.post('/customers', (req, res) => {
    const {
        name, phoneNo, requirement, 
        address, source, day, notes, potential
    } = req.body;
    const customer = new Customer({
        name, phoneNo, requirement, 
        address, source, day, notes, potential
    });
    customer.save().then(() => console.log('SAVED'));
})
router.post('/update/:id', (req, res) => {
    const {
        _address, _day, _name, _notes, _phoneNo, 
        _requirement, _source, _potential,  
    } = req.body
    console.log(_address)
    Customer.findByIdAndUpdate({_id: req.params.id}, {
        $set: {
            name: _name,
            phoneNo: _phoneNo,
            requirement: _requirement,
            address: _address,
            source: _source,
            day: _day,
            potential: _potential,
            notes: _notes
        },
    }, (err, doc) => {
        if(!err)
            console.log("UPDATED")
    })
})

router.delete('/delete/:id', (req, res) => {
    Customer.findByIdAndDelete({_id: req.params.id}, (err, doc) => {
        if(!err)
            console.log('DELETED');
    })
})
module.exports = router;