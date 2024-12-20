var express = require("express");
var router = express.Router();
var Receipt = require("../models/Receipt");
const Purchase = require("../models/Purchase");
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");
const csv = require("csv-parser");
const stream = require("stream");

// Set up multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
  let purchases = r.purchases;
  let receipt = {
    id: r.checkID,
    owner_name: r.owner,
    date_issued: r.dateIssued,
    cost_total: r.cost,
  };

  await Receipt.create(receipt)
    .then(() => {
      console.log("Receipt Created !");
    })
    .catch((err) => {
      console.log("PROBLEM!! " + err);
    });
  console.log(`check ${receipt.id} purchase count : ${purchases.length}`);
  purchases.forEach((p) => {
    let purchase = {
      receipt_id: p.checkID,
      product_id: p.productID,
      amount: p.amount,
      cost: p.cost,
    };
    Purchase.create(purchase)
      .then(() => {
        console.log("Purchase Created !");
        console.log(p.productID);
      })
      .catch((err) => {
        console.log("createReceipt error!! " + err);
        console.log(p);
        console.log("PROBLEM OVER!! ");
      });
  });
  res.status(200).send("");
});

router.get("/receiptpurchases", async function (req, res) {
  let purchases = [];
  await Purchase.findAll({
    where: { receipt_id: req.query.id },
  })
    .then((arr) => {
      purchases = arr.map((p) => ({
        checkID: p.receipt_id,
        productID: p.product_id,
        cost: p.cost,
        amount: p.amount,
      }));
    })
    .catch((err) => {
      console.log("lulw just ignore the error luwl ");
      console.log(err);
      // res.status(500);
      // products = err;
    });
  res.json(purchases);
});
// checkID -> product[]
//router.get("/receiptproducts", async function (req, res) {
router.get("/tempplsignore", async function (req, res) {
  console.log("Getcheck ON");
  let products = [];
  await Product.findAll({
    include: [
      {
        model: Purchase,
        where: { receipt_id: req.query.id },
      },
    ],
  })
    .then((arr) => {
      products = arr.map((p) => ({
        checkName: p.check_name,
        displayName: p.display_name,
        price: p.price,
        weight: p.weight,
        calories: p.calories,
        protein: p.protein,
        fats: p.fats,
        carbs: p.carbs,
      }));
    })
    .catch((err) => {
      console.log("lulw just ignore the error luwl ");
      console.log(err);
      // res.status(500);
      // products = err;
    });
  res.json(products);
});

// productQuery -> product
router.get("/productquery", async function (req, res) {
  console.log("Getcheck ON");
  let product = [];
  await Product.findAll({
    where: {
      display_name: {
        [Op.substring]: req.query.q,
      },
    },
  })
    .then((arr) => {
      arr.forEach((p) => {
        product.push({
          checkName: p.check_name,
          displayName: p.display_name,
          price: p.price,
          weight: p.weight,
          calories: p.calories,
          protein: p.protein,
          fats: p.fats,
          carbs: p.carbs,
        });
      });
    })
    .catch((err) => {
      console.log("lulw just ignore the error luwl ");
      console.log(err);
    });
  res.json(product);
});

// productID -> product
router.get("/product", async function (req, res) {
  console.log("Getcheck ON");
  let product;
  await Product.findOne({
    where: { check_name: req.query.id },
  })
    .then((p) => {
      product = {
        checkName: p.check_name,
        displayName: p.display_name,
        price: p.price,
        weight: p.weight,
        calories: p.calories,
        protein: p.protein,
        fats: p.fats,
        carbs: p.carbs,
      };
    })
    .catch((err) => {
      res.status(404).send({});
      // products = err;
    });
  res.json(product);
});

// OwnerID -> checkID[]
router.get("/ownercheckids", async function (req, res) {
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

router.get("/ownernewestcheckid", async function (req, res) {
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
  console.log("AAA");

  let purchases = await Purchase.findAll({
    where: {
      receipt_id: req.query.id,
    },
    include: [{ model: Product }, { model: Receipt }],
  });

  let purchaseArr = purchases.map((p) => {
    let purchase = {
      checkName: p.product_id,
      price: p.cost,
      amount: p.amount,
    };
    if (p.Product) {
      purchase = {
        ...purchase,
        displayName: p.Product.display_name,
        weight: p.Product.weight,
        calories: p.Product.calories,
        protein: p.Product.protein,
        carbs: p.Product.carbs,
        fats: p.Product.fats,
      };
    } else {
      purchase = {
        ...purchase,
        displayName: "",
        weight: -1,
        calories: -1,
        protein: -1,
        carbs: -1,
        fats: -1,
      };
    }
    return purchase;
  });

  console.log(purchases);
  res.json(purchaseArr);
});

router.post("/uploadcsv", upload.single("file"), async function (req, res) {
  console.log("TEXT UPP");

  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  const csvData = [];
  const errors = [];

  // Create a readable stream from the buffer in memory
  const bufferStream = new stream.PassThrough();
  bufferStream.end(req.file.buffer); // 'buffer' contains the file's content in memory

  // Parse CSV data
  bufferStream
    .pipe(csv())
    .on("data", async (row) => {
      // Process each row of the CSV
      let product = {
        check_name: row.check_name,
        display_name: row.product_name,
        price: +row.price,
        weight: +row.weight,
        calories: +row.calories,
        protein: +row.protein,
        carbs: +row.carbs,
        fats: +row.fats,
      };
      try {
        if (row.price == "*") return;
        let p = await Product.create(product);
        await p.save();
        console.log(`Created ${row.product_name}`);
      } catch (err) {
        console.log(`Err!`);
        console.log(err.message);
        errors.push(err);
      }
      csvData.push(row); // Add the row to the csvData array
    })
    .on("end", () => {
      // After parsing is complete, send the parsed data as a response
      console.log("csvData");
      console.log(csvData);
      console.log("Errors");
      console.log(errors);
      res.status(200).json({
        message: "CSV processed successfully",
        data: csvData, // Send the parsed CSV data
      });
    })
    .on("error", (err) => {
      res.status(500).send("Error processing the file");
    });
});

module.exports = router;
