const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    email: { type: String },
    otp: { type: String },

    status: { type: Number },
  },
  { timestamps: true, versionKey: false }
);

const OTPModel = mongoose.model("otps", DataSchema);
module.exports = OTPModel;
