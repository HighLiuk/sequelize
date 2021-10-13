const { sequelize } = require("./models/index")
const express = require("express")
const userRouter = require("./routes/users")

const app = express()

app.use(express.json())
app.use("/users", userRouter)

app.listen(5000, async () => {
  console.log("Server up on http://localhost:5000")
  await sequelize.authenticate()
  console.log("Database Connected")
})
