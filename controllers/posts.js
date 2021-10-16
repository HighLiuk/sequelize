const { Post, User } = require("../models/index")

function create_post(req, res, next) {
  const { userUuid, body } = req.body
  User.findOne({ where: { uuid: userUuid }, rejectOnEmpty: true })
    .then((user) => Post.create({ body, userId: user.id }))
    .then((post) => res.status(201).json(post))
    .catch(next)
}

function get_posts(req, res, next) {
  Post.findAll({ include: "user" })
    .then((posts) => res.status(200).json({ posts }))
    .catch(next)
}

function get_post(req, res, next) {
  const { uuid } = req.params
  Post.findOne({ where: { uuid }, include: "user", rejectOnEmpty: true })
    .then((post) => res.status(200).json(post))
    .catch(next)
}

function update_post(req, res, next) {
  const { uuid } = req.params
  const { body } = req.body
  Post.findOne({ where: { uuid }, rejectOnEmpty: true })
    .then((post) => {
      post.update({ body })
      return post
    })
    .then((post) => res.status(201).json(post))
    .catch(next)
}

function delete_post(req, res, next) {
  const { uuid } = req.params
  Post.findOne({ where: { uuid }, rejectOnEmpty: true })
    .then((post) => {
      post.destroy()
      return post
    })
    .then((post) => res.status(200).json(post))
    .catch(next)
}

module.exports = {
  create_post,
  get_posts,
  get_post,
  update_post,
  delete_post,
}
