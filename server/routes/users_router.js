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

const router = express.Router({ mergeParams: true })

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
 *   GET,POST /users/:id/articles
 */

router.route('/:id/articles')
  .all(UsersController.find_or_404)
  .all(AuthController.require_jwt_token)
  .get(ArticlesController.authors_index)
  .all(require_body(['title']))
  .post(ArticlesController.create)

/**
 * Routes
 *   PUT,DELETE /users/:user_id/articles/:id
 */

router.route('/:user_id/articles/:id')
  .all(ArticlesController.find_or_404)
  .all(AuthController.require_jwt_token)
  .put(ArticlesController.update)
  .delete(ArticlesController.destroy)

/**
 * Mount steps sub-router
 */

router.use('/:user_id/articles/:article_id/steps',
  ArticlesController.find_or_404,
  require('./steps_router')
)

/**
 * Export router
 */

module.exports = router
