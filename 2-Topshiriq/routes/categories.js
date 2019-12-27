
const express = require('express');
const Joi = require('joi');
const router = express.Router();

const categories = [
    { id: 1, name: 'Dasturlash' },
    { id: 2, name: 'Ma\'lumot omborlari' },
    { id: 3, name: 'Kompyuter tarmoqlari' },
];

router.get('/', (req, res) => {
    res.send(categories);
});

router.post('/', (req, res) => {
    const { error } = validateCategory(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const category = {
        id: categories.length + 1,
        name: req.body.name
    };
    categories.push(category);
    res.status(201).send(category);
});

router.get('/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category)
        return res.status(404).send('Berilgan IDga teng bo\'lgan toifa topilmadi');

    res.send(category);
});

router.put('/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category)
        return res.status(404).send('Berilgan IDga teng bo\'lgan toifa topilmadi');

    const { error } = validateCategory(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    category.name = req.body.name;
    res.send(category);
});

router.delete('/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category)
        return res.status(404).send('Berilgan IDga teng bo\'lgan toifa topilmadi');

    const categoryIndex = categories.indexOf(category);
    categories.splice(categoryIndex, 1);
    res.send(category);
});

function validateCategory(category) {
    const schema = {
        name: Joi.string().required().min(3)
    };

    return Joi.validate(category, schema);
}

module.exports = router;