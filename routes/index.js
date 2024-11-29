var express = require("express");
var router = express.Router();
var Receipt = require("../models/Receipt");
const Purchase = require("../models/Purchase");

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
  let totalPrice = products.reduce((acc, x) => acc + x.price, 0);
  let receipt = {
    id: r.checkID,
    owner_name: r.owner,
    date_issued: r.dateIssued,
    cost_total: totalPrice,
  };

  Receipt.create(receipt)
    .then(() => {
      console.log("Receipt Created !");
    })
    .catch((err) => {
      console.log("PROBLEM!! " + err);
      res.json({code:200});
    });
  console.log(`check ${receipt.id} purchase count : ${products.length}`);
  products.forEach((p) => {
    let purchase = {
      receipt_id: receipt.id,
      product_id: p.name,
      amount: p.amount,
      cost: p.price
    };
  Purchase.create(purchase)
    .then(() => {
      console.log("Purchase Created !");
      console.log(p.name);
    })
    .catch((err) => {
      console.log("PROBLEM!! " + err);
      console.log(p);
      console.log("PROBLEM OVER!! " );
    });

  });
res.status(500);
});

router.get("/getallreceiptids", async function (req, res) {
  console.log("Getcheck ON");
  let ids = [];
   await Receipt.findAll({ where: {owner_name: req.query.owner},attributes: ['id'] })
    .then((receipt) => {
      ids = receipt.map(x=>x.id);
    })
    .catch((err) => {
      ids = err;
    });
    res.json(ids);
});


router.get("/getnewestreceiptid", async function (req, res) {
  console.log("Getcheck ON");
  let id = {id:123456789};
   await Receipt.findOne({ where: {owner_name: req.query.owner},attributes: ['id'], order: [['date_issued', 'DESC']] })
    .then((receipt) => {
      id.id = receipt.id
    })
    .catch((err) => {
      res.send('0');
    });
    res.send(`${id}`);
});


module.exports = router;
