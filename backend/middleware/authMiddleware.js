const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token')

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (err) {
      res.status(401)
      throw new Error('Token is not valid')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('No token, authorization denied')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as admin')
  }
}

module.exports = {
  protect,
  admin,
}
