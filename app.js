const { sequelize } = require("./models/index")
const express = require("express")
const app = express()

app.listen(5000, async () => {
  console.log("Server up on http://localhost:5000")
  await sequelize.authenticate()
  console.log("Database Connected")
})
