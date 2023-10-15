const WorksModel = require("../models/WorksModel");
// ====================================CreateWorks================================
exports.createWorks = async (req, res) => {
  try {
    let reqBody = req.body;
    reqBody.email = req.headers["email"];
    let result = await WorksModel.create(reqBody);
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(200).json({ status: "fail", data: error });
  }
};
// ====================================ReadWorks/WorksDetails================================

exports.readWorks = async (req, res) => {
  try {
    let status = req.body["status"];
    let result = await WorksModel.find({ status: status });
    res.status(200).json({ status: "Success", data: result });
  } catch (error) {
    res.status(200).json({ status: "fail", data: error });
  }
};

// ====================================deleteWorks================================
exports.deleteWorks = async (req, res) => {
  try {
    let id = req.body["_id"];
    let Query = { _id: id };
    let result = await WorksModel.deleteOne(Query);
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(200).json({ status: "fail", data: error });
  }
};

// ====================================UpdateWorks================================
exports.updateWorks = async (req, res) => {
  try {
    let id = req.body["_id"];

    let Query = { _id: id };
    let update = { $set: req.body };
    let result = await WorksModel.updateOne(Query, update, { upsert: true });
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(200).json({ status: "fail", data: error });
  }
};
