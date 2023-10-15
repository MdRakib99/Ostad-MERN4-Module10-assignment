const express = require("express");
const studentController = require("../controllers/StudentsControllers");
const worksController = require("../controllers/WorksController");
const authVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");
const router = express.Router();

//============================Students User Api===========================
router.post("/registration", studentController.registration);
router.post("/studentLogin", studentController.login);
router.get(
  "/studentDetails",
  authVerifyMiddleware,
  studentController.studentDetails
);

router.post(
  "/updateStudentProfile",
  authVerifyMiddleware,
  studentController.profileUpdate
);

router.post(
  "/deleteStudentProfile",
  authVerifyMiddleware,
  studentController.deleteProfile
);

//============================Students Works Api===========================
router.post("/createWork", authVerifyMiddleware, worksController.createWorks);
router.get("/readWorks", authVerifyMiddleware, worksController.readWorks);
router.post("/updateWorks", authVerifyMiddleware, worksController.updateWorks);
router.post("/deleteWorks", authVerifyMiddleware, worksController.deleteWorks);

module.exports = router;
