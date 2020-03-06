const {Course, validate} = require('../models/course'); 
const {Category} = require('../models/category');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const courses = await Course.find().sort('name');
  res.send(courses);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) 
    return res.status(400).send('Berilgan IDga teng bo\'lgan toifa topilmadi.');

  let course = new Course({ 
    title: req.body.title,
    category: {
      _id: category._id,
      name: category.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  course = await course.save();
  
  res.send(course);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) 
    return res.status(400).send('Berilgan IDga teng bo\'lgan toifa topilmadi.');

  const course = await Course.findByIdAndUpdate(req.params.id,
    { 
      title: req.body.title,
      category: {
        _id: category._id,
        name: category.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

  if (!course) 
    return res.status(404).send('Berilgan IDga teng bo\'lgan kurs topilmadi.');
  
  res.send(course);
});

router.delete('/:id', async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id);
  if (!course) 
    return res.status(404).send('Berilgan IDga teng bo\'lgan kurs topilmadi.');

  res.send(course);
});

router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) 
    return res.status(404).send('Berilgan IDga teng bo\'lgan kurs topilmadi.');

  res.send(course);
});

module.exports = router; 