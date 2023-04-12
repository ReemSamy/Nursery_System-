const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('./../Models/teacherModel');
const teacherSchema = mongoose.model('teachers');
exports.login = function (request, response, next) {

  // static admin email:x@x.com,
  //    password:123,
  if (request.body.email == "r@.com" && request.body.password == "123") {
    const token = jsonwebtoken.sign({
      id: 1,
      role: "admin",
      username: "Reem",
    }, "PD_JS", { expiresIn: "1h" })


    response.status(200).json({ data: "ok", token })
  }
  else {
    teacherSchema.findOne({ email: request.body.email })
      .then(async user => {
        if (user == null) {
          throw new Error("Username or Password are Incorrect ...");
        }
        const passwordMatches = await bcrypt.compare(request.body.password, user.password);
        if (passwordMatches) {
          const token = jsonwebtoken.sign({
            id: user._id,
            role: "teacher"
          }, "PD_JS", { expiresIn: "1h" });
          response.status(200).json({ data: "Ok", token });
        } else {
          throw new Error(" Incorrect User...");
        }
      })
      .catch(error => {
        next(error);
      });

  }
};

