const express = require("express");
const controller = require('../Controllers/teacherController');
const {checkAdmin} =require('./../Middlewares/AuthinticateMW');
const router = express.Router();

router.route("/teachers")
.all(checkAdmin)
  .get(controller.GetAllTeachers)
  .post(controller.AddTeacher)
  .put(controller.UpdateTeacher)
  router.route("/teachers/:id")
  .all(checkAdmin)
  .get(controller.GetTeacher)
  .delete(controller.DeleteTeacher)
module.exports = router;


