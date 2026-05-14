var express = require('express');
var router = express.Router();
var taskSchema = require('../models/tasks'); 

router.get('/getTasks', async function (req, res, next) {
  try {
    let response = await taskSchema.find({});
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/addTask', async function (req, res, next) {
  try {
    const { name, description, dueDate } = req.body;

    if (name && description && dueDate) {
      req.body.dueDate = new Date(dueDate);

      let task = new taskSchema(req.body);
      let response = await task.save();
      
      res.status(200).json(response);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/removeTask/:id', async function (req, res, next) {
  if (req.params && req.params.id) {
    let id = req.params.id;
    try {
      await taskSchema.findByIdAndDelete(id);
    return  res.status(200).json({ message: `Goal with id ${id} deleted` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(400).json({ error: "Please provide a valid task ID" });
  }
});

module.exports = router;