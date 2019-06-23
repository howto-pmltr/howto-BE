'use strict'

/**
 * Dependencies
 */

const bcryptjs = require('bcryptjs')
const User = require('../models/User')

/**
 * Define controller
 */

class UsersController {
  static async signup(req, res) {
    try {
      const password_hash = bcryptjs.hashSync(req.body.password, 13)

      const user = await User.create({
        email: req.body.email,
        password_hash: password_hash
      })

      const token = await User.generate_token(user)

      res.status(201).json({user, token})
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' }})
    }
  }

  static async signin(req, res) {
    try {
      const user = await User.find({ email: req.body.email })

      if (user) {
        if (bcryptjs.compareSync(req.body.password, user.password_hash)) {
          const token = await User.generate_token(user)

          res.status(200).json({user, token})
        } else {
          res.status(401).json({ error: { message: 'Invalid Credentials' }})
        }
      } else {
        res.status(404).json({ error: { message: `User not found for ${req.body.email}` }})
      }
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' }})
    }
  }
}

/**
 * Export controller
 */

module.exports = UsersController