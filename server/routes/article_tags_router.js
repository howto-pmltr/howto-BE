'use strict'

/**
 * Dependencies
 */

const express = require('express')
const require_body = require('../middleware/checks/require_body')
const ArticleTagsController = require('../controllers/ArticleTagsController')
const AuthController = require('../controllers/AuthController')

/**
 * Define router
 */

const router = express.Router({ mergeParams: true })

/**
 * Routes
 *   GET,POST /articles/:article_id/tags
 */

router.route('/')
  .get(ArticleTagsController.index)
  .all(AuthController.require_jwt_token)
  .all(require_body(['tag_title']))
  .post(ArticleTagsController.create)

/**
 * Routes
 *   DELETE /articles/:article_id/tags/:id
 */

router.route('/:id')
  .all(ArticleTagsController.find_or_404)
  .all(AuthController.require_jwt_token)
  .delete(ArticleTagsController.destroy)

/**
 * Export router
 */

module.exports = router
