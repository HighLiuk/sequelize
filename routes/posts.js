const { Post, User } = require("../models/index")
const express = require("express")
const app = express.Router()

app.post("/", async (req, res) => {
  const { userUuid, body } = req.body

  try {
    const user = await User.findOne({
      where: { uuid: userUuid },
    })
    const post = await Post.create({
      body,
      userId: user.id,
    })
    return res.status(201).json(post)
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      error: "The user does not exists",
    })
  }
})

app.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({ include: "user" })
    return res.json(posts)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
})

module.exports = app
