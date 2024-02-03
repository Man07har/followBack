const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc get all contacts
//@route GET /api/contacts
//@access private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.find({ user_id: req.user.id });
  res.json(contact);
});
//@desc CREATE all contacts
//@route POST /api/contacts
//@access private
const postContact = asyncHandler(async (req, res) => {
  console.log("the request body  is: ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.json(contact);
});

//@desc UPDATE all contacts
//@route PUT /api/contacts
//@access private
const putContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.Status(404);
    throw new Error("The contact you were trying to update is not found here");
  }
  if (contact.user_id.toString() !== req.user.id) {
    // check if the user is the owner of the contact
    res.status(401);
    throw new Error("You are not authorized to update this contact");
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
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error("Contact not found to delete it");
  }
  if (contact.user_id.toString() !== req.user.id) {
    // check if the user is the owner of the contact
    res.status(401);
    throw new Error("You are not authorized to delete this contact");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

//@desc get contacts BY ID
//@route GET /api/contacts
//@access private
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
