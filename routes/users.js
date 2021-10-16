const userController = require("../controllers/users")
const express = require("express")
const app = express.Router()

app.post("/", userController.create_user)
app.get("/", userController.get_users)
app.get("/:uuid", userController.get_user)
app.put("/:uuid", userController.update_user)
app.delete("/:uuid", userController.delete_user)

module.exports = app
