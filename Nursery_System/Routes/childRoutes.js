const express=require("express");
const controller=require('../Controllers/childController');
const {checkTeacher,checkAdmin}=require('./../Middlewares/AuthinticateMW');
const router=express.Router();
router.route("/children")
        .get(checkAdmin,controller.GetAllChilds)
        .post(checkAdmin,controller.AddChild)
        .patch(checkTeacher,controller.UpdateChild)
        

router.route("/children/:id")
        .get(checkAdmin,controller.GetChild)
        .delete(checkAdmin,controller.DeleteChild);

module.exports=router;