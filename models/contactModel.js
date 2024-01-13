const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the constact name"],
    },
    email: {
      type: String,
      required: [true, "please add the email id"],
    },
    phone: {
      type: String,
      required: [true, "please add the phone number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
