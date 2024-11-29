var express = require('express');
var router = express.Router();
var Receipt = require('../models/Receipt');


/* GET home page. */
router.get('/', function(req, res) {
  res.json({"WEOW":123});
});

router.get('/getreceipt', async function(req, res) {
  console.log("Getcheck ON");
  Receipt.findOne({ where: {id:req.query.id}})
  .then(x => {res.json(x)})
  .catch(err => {res.send(err)});
});

router.post('/createreceipt', async function(req, res) {
  console.log("CREATE receipt ON");
console.log(req.body);
console.log();




  // Receipt.findOne({ where: {id:req.query.id}})
  // .then(x => {res.json(x)})
  // .catch(err => {res.send(err)});
});


module.exports = router;
