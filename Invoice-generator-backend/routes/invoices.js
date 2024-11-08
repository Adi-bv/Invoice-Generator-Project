const express = require("express");
const auth = require("../middleware/auth");
const Invoice = require("../models/Invoice");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const router = express.Router();

router.post("/", auth, asyncHandler (async (req, res) => {
   

  const { date, dueDate, nameTo, addressTo, nameFrom, addressFrom, items, discount, total } = req.body; 
  const user = req?.user;

  if(!user || !date || !dueDate || !nameTo || !addressTo || !nameFrom || !addressFrom || !items || !total){
    res.status(200).json({msg: "All fields are required"});
  }

  try {
    const newInvoice = new Invoice({
      user,
      date,
      dueDate,
      nameTo,
      addressTo,
      nameFrom,
      addressFrom,
      items,
      discount,
      total,
    });
    const invoice = await newInvoice.save();
    res.status(200).json({success: true, invoice});
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}));

router.get("/", auth, asyncHandler(async (req, res) => {
   

  try {
    
    const invoices = await Invoice.find({ user: req?.user});
    res.json(invoices); 
  } catch (err) {
    console.error("getinvoice",err.message);
    res.status(500).json(err);
  }
}));

router.get("/:id", auth, asyncHandler(async (req, res) => { 
   

  try { 
    const { id } = req.params; 
    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({ msg: "Invoice not found" });
    }

    if (invoice.user.toString() !== req.user) {
      return res.status(404).json({ msg: "Invoice not authorized" });
    }

    res.json(invoice);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Invoice not found" });
    }
    res.status(500).json(err);
  }
}));

router.put('/:id',auth, asyncHandler(async(req, res) => {
   

  const { dueDate, nameTo, addressTo, nameFrom, addressFrom, items, discount, total } = req.body;

  const updatedInvoice = { dueDate, nameTo, addressTo, nameFrom, addressFrom, items, discount, total };

  try {
    const { id } = req.params; 
    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({ msg: 'Invoice not found' });
    }

    if (invoice.user.toString() !== req.user) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const updated = await Invoice.findByIdAndUpdate(
      id,
      { $set: updatedInvoice },
      { new: true }
    );

    res.status(200).json({success: true, updated});
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err);
  }
}));

router.delete("/delete/:id", auth, asyncHandler(async(req, res) => {
  
  try {
    const { id } = req.params;
    console.log("delete req", id);
    const invoice = await Invoice.findById(id);

    if(!invoice) {
      return res.status(404).json({msg: "Invoice not found"});
    }

    if (invoice.user.toString() !== req.user) {
      return res.status(401).json({msg: "Not authorized"});
    }

    await Invoice.findByIdAndDelete(id);
    res.status(200).json({success: true, msg: "Invoice deleted successfully"});
  } catch (error) {
    console.error(err.message);
    res.status(500).json(err);
  }
}))

module.exports = router;
