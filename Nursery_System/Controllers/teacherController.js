const mongoose = require("mongoose");
require("../Models/teacherModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// Getter for the model
const teacherschema = mongoose.model("teachers");

exports.GetAllTeachers = function (request, response, next) {
  teacherschema
    .find({})
    .then((data) => {
      // response
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error); //----> error middleware
    });
};

exports.AddTeacher = async function (request, response, next) {
  const hashedPwd = await bcrypt.hash(request.body.password, saltRounds);
  let object = new teacherschema({
    _id: request.body.id,
    fullName: request.body.fullName,
    password: hashedPwd,
    email: request.body.email,
    image: request.body.image,
  });

  object
    .save()
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.GetTeacher = function (request, response, next) {
  teacherschema
    .findOne({ _id: request.params.id })
    .then((teacher) => {
      if (teacher == null) {
        throw new Error("Teacher with that Id not exists");
      }
      response.status(200).json({ teacher });
    })
    .catch((error) => next(error));
};

exports.UpdateTeacher = async function (request, response, next) {
  const hashedPwd = await bcrypt.hash(request.body.password, saltRounds);
  teacherschema
    .updateOne(
      {
        _id: request.body.id,
      },
      {
        $set: {
          fullName: request.body.fullName,
          password: hashedPwd,
          email: request.body.email,
          image: request.body.image,
        },
      }
    )
    .then((data) => {
      response.status(200).json({ data: " Updated" });
    })
    .catch((error) => {
      next(error);
    });
};

exports.DeleteTeacher = function (request, response, next) {
  teacherschema
    .deleteOne({
      _id: request.params.id,
    })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};
