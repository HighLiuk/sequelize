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

module.exports = app
