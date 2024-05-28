var express = require('express');
var router = express.Router();
var ToDoListModel=require("../models/ToDoListSchema");

router.get('/', function(req, res, next) {
  ToDoListModel.find()
  .then((data)=>res.status(200).json(data))
  .catch(err=>res.status(500).json(err))
});

router.post('/add', function(req, res, next) {
    var listItem=new ToDoListModel({
        name:req.body.name
    })
    listItem.save()
    .then(()=>{console.log("Saved");res.send(req.body.name);})
    .catch((err)=>{console.log("Error");res.send(err);});
    res.set('Access-Control-Allow-Origin', '*');
  });
  

module.exports = router;
