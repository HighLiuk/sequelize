const { User } = require("../models/index")

function create_user(req, res, next) {
  const { name, email, role } = req.body
  User.create({ name, email, role })
    .then((user) => res.status(201).json(user))
    .catch(next)
}

function get_users(req, res, next) {
  User.findAll({ include: "posts" })
    .then((users) => res.status(200).json({ users }))
    .catch(next)
}

function get_user(req, res, next) {
  const { uuid } = req.params
  User.findOne({ where: { uuid }, include: "posts", rejectOnEmpty: true })
    .then((user) => res.status(200).json(user))
    .catch(next)
}

function update_user(req, res, next) {
  const { uuid } = req.params
  const { name, email, role } = req.body
  User.findOne({ where: { uuid }, rejectOnEmpty: true })
    .then((user) => {
      user.update({ name, email, role })
      return user
    })
    .then((user) => res.status(201).json(user))
    .catch(next)
}

function delete_user(req, res, next) {
  const { uuid } = req.params
  User.findOne({ where: { uuid }, rejectOnEmpty: true })
    .then((user) => {
      user.destroy()
      return user
    })
    .then((user) => res.status(200).json(user))
    .catch(next)
}

module.exports = {
  create_user,
  get_users,
  get_user,
  update_user,
  delete_user,
}
