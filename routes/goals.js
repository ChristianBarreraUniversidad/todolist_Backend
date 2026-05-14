var express = require('express');
var router = express.Router();
var goalSchema = require('../models/goals');

router.get('/getGoals', async function (req, res, next){
try {
    let response = await goalSchema.find({});
    res.status(200).json(response);
} catch (err) {
    res.status(500).json({ 
      error: err.message  
    });
  }
});

router.post('/addGoal', async function (req, res, next){
try {
    req.body.dueDate = new Date(req.body.dueDate);

    let goal = new goalSchema(req.body);
    let response = await goal.save();
    return  res.status(200).json(response);
} catch (err) {
    res.status(500).json({ 
      error: err.message  
    });
  }
});


router.delete('/removeGoal/:id', async function (req, res, next) {

if (req.params && req.params.id) {
    
    let id = req.params.id;

try {
    await goalSchema.findByIdAndDelete(id);
    return  res.status(200).json({ message: `Goal with id ${id} deleted` });
} catch (err) {
    res.status(500).json({ 
      error: err.message  
    });
  }
} else {
    res.status(400).json({ error: "Please provide a valid goal ID" });
}
});

module.exports = router;



