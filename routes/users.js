const { User } = require("../models/index")
const express = require("express")
const app = express.Router()

app.post("/", (req, res, next) => {
  const { name, email, role } = req.body
  User.create({ name, email, role })
    .then((user) => res.status(201).json(user))
    .catch(next)
})

app.get("/", (req, res, next) => {
  User.findAll({ include: "posts" })
    .then((users) => res.status(200).json({ users }))
    .catch(next)
})

app.get("/:uuid", (req, res, next) => {
  const { uuid } = req.params
  User.findOne({ where: { uuid }, include: "posts", rejectOnEmpty: true })
    .then((user) => res.json(user))
    .catch(next)
})

module.exports = app
