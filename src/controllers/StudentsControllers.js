const OTPModel = require("../models/OTPModel");
const StudentModel = require("../models/StudentsModel");

const jwt = require("jsonwebtoken");

//=================================Student Profile Create/Registration=================================
exports.registration = async (req, res) => {
  let reqBody = req.body;
  try {
    let result = await StudentModel.create(reqBody);
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(200).json({ status: "failed", data: error });
  }
};

//================================= Student Profile Login=================================
exports.login = async (req, res) => {
  try {
    let reqBody = req.body;
    let result = await StudentModel.find(reqBody).count();
    if (result === 1) {
      //Login Success

      //Create Token
      let Payload = {
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        data: reqBody["email"],
      };
      let token = jwt.sign(Payload, "SecretKey123456789");
      res.status(200).json({ status: "success", data: token });
    } else {
      //Login fialed
      res.status(200).json({ status: "failed", data: "No User Found" });
    }
  } catch (error) {
    res.status(200).json({ status: "fail", data: error });
  }
};

//================================= Student ProfileUpdate=================================

exports.profileUpdate = async (req, res) => {
  try {
    let email = req.headers["email"];
    let reqBody = req.body;
    let result = await StudentModel.updateOne({ email: email }, reqBody);
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(200).json({ status: "fail", data: error });
  }
};

//=================================ProfileDetails/Read=================================
exports.studentDetails = async (req, res) => {
  try {
    let email = req.headers["email"];
    let result = await StudentModel.find({ email: email });
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(200).json({ status: "fail", data: error });
  }
};

//=================================deletePorfile=======================================

exports.deleteProfile = async (req, res) => {
  try {
    const id = req.body["_id"];
    const email = req.headers.email;

    const query = { _id: id, email: email };

    const result = await StudentModel.deleteOne(query);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ status: "successfully deleted", data: result });
  } catch (error) {
    res.status(200).json({ status: "fail", data: error });
  }
};
