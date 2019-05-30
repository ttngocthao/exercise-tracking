const router = require("express").Router();
let User = require("../models/user.model");

//Get all users
//url: localhost:5000/users/
router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

//add user
//url: localhost:5000/users/add
router.route("/add").post((req, res) => {});
