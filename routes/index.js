var express = require("express");
var router = express.Router();
var Receipt = require("../models/Receipt");

/* GET home page. */
router.get("/", function (req, res) {
  res.json({ WEOW: 123 });
});

router.get("/getreceipt", async function (req, res) {
  console.log("Getcheck ON");
  Receipt.findOne({ where: { id: req.query.id } })
    .then((x) => {
      res.json(x);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/createreceipt", async function (req, res) {
  console.log("CREATE receipt ON");
  //Need input check
  let r = req.body;
  let products = r.products;
  let totalPrice = products.reduce((x, y) => x + y, 0);
  let receipt = {
    id: r.checkID,
    owner_name: r.owner,
    date_issued: r.date_issued,
    cost_total: totalPrice,
  };

  Receipt.create(receipt)
  .then(()=>{console.log("Receipt Created !")})
  .catch(err=>{console.log("PROBLEM!! " + err)});

  // Receipt.findOne({ where: {id:req.query.id}})
  // .then(x => {res.json(x)})
  // .catch(err => {res.send(err)});
});

module.exports = router;
