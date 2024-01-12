const express = require("express");
const router = express.Router();
const {
  getContact,
  postContact,
  putContact,
  deleteContact,
  getContactbyId,
} = require("../controllers/contactController");
router.route("/").get(getContact).post(postContact);

router.route("/:id").put(putContact).delete(deleteContact).get(getContactbyId);

module.exports = router;
