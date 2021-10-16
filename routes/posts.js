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
    .then((posts) => res.status(200).json({ posts }))
    .catch(next)
})

app.get("/:uuid", (req, res, next) => {
  const { uuid } = req.params
  Post.findOne({ where: { uuid }, include: "user", rejectOnEmpty: true })
    .then((post) => res.status(200).json(post))
    .catch(next)
})

app.put("/:uuid", (req, res, next) => {
  const { uuid } = req.params
  const { body } = req.body
  Post.findOne({ where: { uuid }, rejectOnEmpty: true })
    .then((post) => {
      post.update({ body })
      return post
    })
    .then((post) => res.status(201).json(post))
    .catch(next)
})

app.delete("/:uuid", (req, res, next) => {
  const { uuid } = req.params
  Post.findOne({ where: { uuid }, rejectOnEmpty: true })
    .then((post) => {
      post.destroy()
      return post
    })
    .then((post) => res.status(200).json(post))
    .catch(next)
})

module.exports = app
