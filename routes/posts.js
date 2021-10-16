const postController = require("../controllers/posts")
const express = require("express")
const app = express.Router()

app.post("/", postController.create_post)
app.get("/", postController.get_posts)
app.get("/:uuid", postController.get_post)
app.put("/:uuid", postController.update_post)
app.delete("/:uuid", postController.delete_post)

module.exports = app
