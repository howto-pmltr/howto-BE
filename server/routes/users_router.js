'use strict'

/**
 * Dependencies
 */

const express = require('express')
const require_body = require('../middleware/checks/require_body')
const UsersController = require('../controllers/UsersController')

/**
 * Define router
 */

const router = express.Router()

/**
 * Routes
 *   POST /users/signup
 */

router.route('/signup')
  .all(require_body(['username', 'email', 'password']))
  .post(UsersController.signup)

/**
 * Routes
 *   POST /users/signin
 */

router.route('/signin')
  .all(require_body(['username', 'password']))
  .post(UsersController.signin)

/**
 * Routes
 *   POST /users/signout
 */

router.route('/signout')
  .post(UsersController.signout)

/**
 * Routes
 *   POST /users/deactivate
 */

router.route('/deactivate')
  .post(UsersController.deactivate)

/**
 * Export router
 */

module.exports = router
