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
  static async find_or_404(req, res, next) {
    try {
      const user_id = (req.params.user_id) ? req.params.user_id : req.params.id
      const user = await User.find({ id: user_id })

      if (user) {
        next()
      } else {
        res.status(404).json({ error: { message: 'User not found' } })
      }
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async signup(req, res) {
    try {
      const user_username = await User.find({ username: req.body.username })
      if (user_username) {
        return res.status(400).json({ error: { message: 'User with that username already exists.' } })
      }

      const user_email = await User.find({ email: req.body.email })
      if (user_email) {
        return res.status(400).json({ error: { message: 'User with that email already exists.' } })
      }

      if (req.body.password.length < 6) {
        return res.status(400).json({ error: { message: 'Password is too short (minimum 6 characters).' } })
      }

      const password_hash = bcryptjs.hashSync(req.body.password, 13)

      const user = await User.create({
        username: req.body.username,
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
      const user = await User.find({ username: req.body.username })

      if (user) {
        if (bcryptjs.compareSync(req.body.password, user.password_hash)) {
          const token = await User.generate_token(user)

          res.status(200).json({user, token})
        } else {
          res.status(401).json({ error: { message: 'Invalid Credentials' }})
        }
      } else {
        res.status(404).json({ error: { message: `User not found for ${req.body.username}` }})
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
