const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc get all contacts
//@route GET /api/contacts
//@access Public

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.find();
  res.json(contact);
});
//@desc CREATE all contacts
//@route POST /api/contacts
//@access Public
const postContact = asyncHandler(async (req, res) => {
  console.log("the request body  is: ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  const contact = await Contact.create({ name, email, phone });
  res.json(contact);
});

//@desc UPDATE all contacts
//@route PUT /api/contacts
//@access Public
const putContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.Status(404);
    throw new Error("The contact you were trying to update is not found here");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@desc DELETE contacts
//@route DELETE /api/contacts
//@access Public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error("Contact not found to delete it");
  }
  await Contact.remove();
  res.status(200).json(contact);
});

//@desc get contacts BY ID
//@route GET /api/contacts
//@access Public
const getContactbyId = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not found");
  }
  res.status(200).json(contact);
});

module.exports = {
  getContact,
  postContact,
  putContact,
  deleteContact,
  getContactbyId,
};
