const express=require("express");
const controller = require('../Controllers/classController');
const {checkAdmin} =require('./../Middlewares/AuthinticateMW');
const router=express.Router();

router.route("/Class")
.all(checkAdmin)
      .get(controller.GetAllClasses)
      .post(controller.AddClass)
      .put(controller.UpdateClass)
      
      router.route("/Class/:id")
      .all(checkAdmin)
      .get(controller.GetClass)
      .delete(controller.DeleteClass);
module.exports=router;
