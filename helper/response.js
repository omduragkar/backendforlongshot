const response = (res, status, message, data, error = false) => {
  if (error) {
    return res.status(status).json({
      errorMessage:message,
      error: data,
      error
    })
  } else {
    return res.status(status).json({
      message,
      data,
      success: true
    })
  }
}
module.exports = response
