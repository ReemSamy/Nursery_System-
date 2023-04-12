const mongoose = require("mongoose");
require("./../Models/classModel");
const classSchema = mongoose.model("classes");
const teacherSchema = mongoose.model("teachers");

exports.GetAllClasses = function (request, response, next) {
    if (request.decodedToken.role == "teacher") {
        throw new Error("Not Authorized");
    }

    classSchema
        .find({})
        .then((data) => {
            response.status(200).json({ data });
        })
        .catch((error) => {
            next(error);
        });
};
exports.AddClass = function (request, response, next) {
  teacherSchema
    .findOne({ _id: request.body.supervisor })
    .then((teacher) => {
      if (teacher == null) {
        throw new Error("Teacher not exists ..!");
      }

      let object = new classSchema({
        name: request.body.name,
        supervisor: request.body.supervisor,
      });
      return object.save();
    })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};


exports.GetClass = function (request, response) {
    classSchema
        .findOne({ _id: request.params.id })
        .then((Class) => {
            if (Class == null) {
                throw new Error(" Class not exists");
            }
            response.status(200).json({ Class });
        })
        .catch((error) => next(error));
};
exports.UpdateClass = function (request, response, next) {
    teacherSchema
        .findOne({ _id: request.body.supervisor })
        .then((teacher) => {
            if (teacher == null) {
                throw new Error("Teacher not exists ..!");
            }

            return classSchema.updateOne(
                { _id: request.body.id },
                {
                    name: request.body.name,
                    supervisor: new mongoose.Types.ObjectId(request.body.supervisor), // Use new keyword here
                }
            );
        })
        .then((data) => {
            response.status(200).json({ data });
        })
        .catch((error) => {
            next(error);
        });
};

exports.DeleteClass = function (request, response) {
    classSchema
        .findOne({ _id: request.params.id })
        .then((data) => {
            if (data == null) {
                throw new Error("Class not found !");
            }
            classSchema.deleteOne({ _id: request.params.id }).then((data) => {
                response.status(200).json({ data: "Deleted!" });
            });
        })
        .catch((error) => {
            next(error);
        });
};
