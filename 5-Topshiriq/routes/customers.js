const express = require('express');
const Joi = require('joi');
const router = express.Router();
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isVip: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Customer = mongoose.model('Customer', customerSchema);

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        isVip: req.body.isVip,
        phone: req.body.phone
    });
    customer = await customer.save();

    res.status(201).send(customer);
});

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        isVip: Joi.boolean().required(),
        phone: Joi.string().min(5).max(50).required()
    };

    return Joi.validate(customer, schema);
}

module.exports = router;