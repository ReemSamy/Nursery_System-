const mongoose = require('mongoose');
require('./../Models/childModel');
require('./../Models/classModel');
const childschema = mongoose.model('childs');
const classschema = mongoose.model('classes');
exports.GetAllChilds = function (request, response, next) {
    childschema.find({})
        .populate({ path: "class", select: { name: 1 } })
        .then((data) => { //response 
            response.status(200).json({ data });
        }).catch((error) => {
            next(error); //----> error middleware
        });
};
exports.AddChild = function (request, response, next) {
    classschema.findOne({ _id: request.body.class })
        .then(data => {
            if (data == null) {
                throw new Error("Class not exists ..!")
            }
            let object = new childschema({
                fullName: request.body.fullName,
                age: request.body.age,
                level: request.body.level,
                class: request.body.class,
                address: {
                    city: request.body.address.city,
                    street: request.body.address.street,
                    building: request.body.address.building
                }
            })
            return object.save()
        })
        .then(data => {
            response.status(200).json({ data });
        })
        .catch(error => {
            next(error);
        })
}


exports.GetChild = function (request, response) {

    childschema.findOne({ _id: request.params.id })
        .then((child) => {
            if (child == null) {
                throw new Error("Child with this Id not exists");
            }
            response.status(200).json({ child });
        }).catch((error) => next(error))
};
exports.UpdateChild = function (request, response, next) {
    childschema.updateOne({
        _id: request.body._id
    },
        {
            $set: {
                _id: request.body._id,
                fullName: request.body.fullName,
                age: request.body.age,
                level: request.body.level,
                address: request.body.address,
                class: request.body.class
            },
        })
        .then(data => {
            response.status(200).json({ data });
        })
        .catch(error => {
            next(error);
        })
};
exports.DeleteChild = function (request, response, next) {
    childschema.findOne({ _id: request.params.id })
        .then(child => {
            if (child == null) {
                throw new Error("Child not found!")
            }

            childschema.deleteOne({ _id: request.params.id })
                .then(child => {
                    response.status(200).json({ child: "Deleted" });
                })
        })
        .catch(error => {
            next(error);
        })
};