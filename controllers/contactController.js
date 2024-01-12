const asyncHandler = require("express-async-handler");

//@desc get all contacts
//@route GET /api/contacts
//@access Public

const getContact = asyncHandler(async (req, res) => {
  res.json({ message: "Get all contacts" });
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
  res.json({ message: "create contacts" });
});

//@desc UPDATE all contacts
//@route PUT /api/contacts
//@access Public
const putContact = asyncHandler(async (req, res) => {
  res.json({ message: `update contact ${req.params.id}` });
});

//@desc DELETE contacts
//@route DELETE /api/contacts
//@access Public
const deleteContact = asyncHandler(async (req, res) => {
  res.json({ message: `delete contact ${req.params.id}` });
});

//@desc get contacts BY ID
//@route GET /api/contacts
//@access Public
const getContactbyId = asyncHandler(async (req, res) => {
  res.json({ message: `get contact ${req.params.id}` });
});

module.exports = {
  getContact,
  postContact,
  putContact,
  deleteContact,
  getContactbyId,
};
