'use strict'

/**
 * Dependencies
 */

const express = require('express')
const require_body = require('../middleware/checks/require_body')
const UsersController = require('../controllers/UsersController')
const AuthController = require('../controllers/AuthController')
const ArticlesController = require('../controllers/ArticlesController')

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
 * Routes
 *   POST /users/:id/articles
 */

router.route('/')
  .all(UsersController.find_or_404)
  .all(AuthController.require_jwt_token)
  .all(require_body(['title']))
  .post(ArticlesController.create)

/**
 * Export router
 */

module.exports = router
