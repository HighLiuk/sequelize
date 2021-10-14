const { User } = require("../models/index")
const express = require("express")
const app = express.Router()

app.post("/", async (req, res) => {
  const { name, email, role } = req.body

  try {
    const user = await User.create({ name, email, role })
    return res.status(201).json(user)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
})

app.get("/", async (req, res) => {
  try {
    const users = await User.findAll({ include: "posts" })
    return res.json(users)
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      error: "Something went wrong",
    })
  }
})

app.get("/:uuid", async (req, res) => {
  const { uuid } = req.params

  try {
    const user = await User.findOne({
      where: { uuid },
      include: "posts",
    })
    return res.json(user)
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      error: "Resource not found",
    })
  }
})

module.exports = app
