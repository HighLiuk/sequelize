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
    .then((user) => res.status(200).json(user))
    .catch(next)
})

app.put("/:uuid", (req, res, next) => {
  const { uuid } = req.params
  const { name, email, role } = req.body
  User.findOne({ where: { uuid }, rejectOnEmpty: true })
    .then((user) => {
      user.update({ name, email, role })
      return user
    })
    .then((user) => res.status(201).json(user))
    .catch(next)
})

app.delete("/:uuid", (req, res, next) => {
  const { uuid } = req.params
  User.findOne({ where: { uuid }, rejectOnEmpty: true })
    .then((user) => {
      user.destroy()
      return user
    })
    .then((user) => res.status(200).json(user))
    .catch(next)
})

module.exports = app
