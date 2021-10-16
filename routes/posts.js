const { Post, User } = require("../models/index")
const express = require("express")
const app = express.Router()

app.post("/", (req, res, next) => {
  const { userUuid, body } = req.body
  User.findOne({ where: { uuid: userUuid }, rejectOnEmpty: true })
    .then((user) => Post.create({ body, userId: user.id }))
    .then((post) => res.status(201).json(post))
    .catch(next)
})

app.get("/", (req, res, next) => {
  Post.findAll({ include: "user" })
    .then((posts) => res.json({ posts }))
    .catch(next)
})

module.exports = app
