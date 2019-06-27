'use strict'

/**
 * Dependencies
 */

const jsonwebtoken = require('jsonwebtoken')
const secrets = require('../config/secrets')

/**
 * Define controller
 */

class AuthController {
  static require_jwt_token(req, res, next) {
    const token = req.header('Authorization')

    if (token) {
      jsonwebtoken.verify(token, secrets.jsonwebtoken_secret, (err, decoded) => {
        if (err) return res.status(401).json(err)

        req.decoded = decoded

        next()
      })
    } else {
      return res.status(401).json({
        error: { message: 'No token provided, must be set on the Authorization Header' }
      })
    }
  }
}

/**
 * Export controller
 */

module.exports = AuthController
