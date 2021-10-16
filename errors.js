const {
  UniqueConstraintError,
  ValidationError,
  EmptyResultError,
} = require("sequelize")

// error handling
function errorHandler(err, req, res, next) {
  console.log("\x1b[33m%s\x1b[0m", "ERROR")

  // Unique Constraint Error
  if (err instanceof UniqueConstraintError) {
    const { type, message, path, value } = err.errors[0]
    return res.status(400).json({
      status: "error",
      type,
      message,
      field: path,
      value,
    })
  }

  // Validation Error
  if (err instanceof ValidationError) {
    const { type, message, path, value } = err.errors[0]
    return res.status(422).json({
      status: "error",
      type,
      message,
      field: path,
      value,
    })
  }

  // Not Found Error
  if (err instanceof EmptyResultError) {
    return res.status(404).json({
      status: "error",
      type: "not found",
      message: "resource not found",
    })
  }

  // Server Error
  // development
  return res.status(500).json(err)

  // production
  return res.status(500).json({
    status: "error",
    type: "server error",
    message: "Internal Server Error",
  })
}

module.exports = {
  errorHandler,
}
