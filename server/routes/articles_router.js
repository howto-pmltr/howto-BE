'use strict'

/**
 * Dependencies
 */

const express = require('express')
const require_body = require('../middleware/checks/require_body')
const ArticlesController = require('../controllers/ArticlesController')
const AuthController = require('../controllers/AuthController')

/**
 * Define router
 */

const router = express.Router()

/**
 * Routes
 *   GET,POST /articles
 */

router.route('/')
  .get(ArticlesController.index)
  .all(AuthController.require_jwt_token)
  .all(require_body(['title', 'description']))
  .post(ArticlesController.create)

/**
 * Routes
 *   GET,PUT,DELETE /articles/:id
 */

router.route('/:id')
  .all(ArticlesController.find_or_404)
  .get(ArticlesController.show)
  .all(AuthController.require_jwt_token)
  .put(ArticlesController.update)
  .delete(ArticlesController.destroy)

/**
 * Mount steps sub-router
 */

router.use('/:article_id/steps',
  ArticlesController.find_or_404,
  require('./steps_router')
)

/**
 * Mount article_tags sub-router
 */

router.use('/:article_id/tags',
  ArticlesController.find_or_404,
  require('./article_tags_router')
)

/**
 * Export router
 */

module.exports = router
