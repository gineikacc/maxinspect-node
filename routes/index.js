var express = require("express");
var router = express.Router();
var Receipt = require("../models/Receipt");
const Purchase = require("../models/Purchase");
const Product = require("../models/Product");

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
      res.json({ code: 200 });
    });
  console.log(`check ${receipt.id} purchase count : ${products.length}`);
  products.forEach((p) => {
    let purchase = {
      receipt_id: receipt.id,
      product_id: p.name,
      amount: p.amount,
      cost: p.price,
    };
    Purchase.create(purchase)
      .then(() => {
        console.log("Purchase Created !");
        console.log(p.name);
      })
      .catch((err) => {
        console.log("PROBLEM!! " + err);
        console.log(p);
        console.log("PROBLEM OVER!! ");
      });
  });
  res.status(500);
});

router.get("/getallreceiptids", async function (req, res) {
  console.log("Getcheck ON");
  let ids = [];
  await Receipt.findAll({
    where: { owner_name: req.query.owner },
    attributes: ["id"],
  })
    .then((receipt) => {
      ids = receipt.map((x) => x.id);
    })
    .catch((err) => {
      ids = err;
    });
  res.json(ids);
});

router.get("/getnewestreceiptid", async function (req, res) {
  console.log("Getcheck ON");
  await Receipt.findOne({
    where: { owner_name: req.query.owner },
    attributes: ["id"],
    order: [["date_issued", "DESC"]],
  })
    .then((receipt) => {
      res.send(`${receipt.id}`);
    })
    .catch((err) => {
      res.send(`0`);
    });
});

router.get("/getreceiptdetails", async function (req, res) {
  console.log("ReceiptDetails ON");
  // owner checkID products dateIssued
  await Receipt.findOne({
    where: { owner_name: req.query.owner },
    attributes: ["id"],
  })
    .then((receipt) => {
      console.log(`LOLOL`);
      //Find all purchases belonging to receipt
      Purchase.findOne({
        where: { receipt_id: receipt.id },
        include: [{ model: Product, as: "product" }],
      })
        .then((purchaseArr) => {
          console.log(`LOLOL`);
          let purchases = purchaseArr.map((x) => x.toJSON());
          console.log(`LOLOL`);
          console.log(purchases);
        })
        .catch((err) => {});
    })
    .catch((err) => {
      res.error(err);
    });
});

router.get("/test", async function (req, res) {
  Purchase.findOne({
    include: [{ model: Product, as: "product" }],
  })
    .then((purchaseArr) => {
      console.log(purchaseArr);
      let purchases = purchaseArr.map((x) => x.toJSON());
      console.log(purchases);
    })
    .catch((err) => {res.error(err)});
});

module.exports = router;
