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

const router = express.Router({ mergeParams: true })

/**
 * Routes
 *   GET /articles
 */

router.route('/')
  .get(ArticlesController.published_index)

/**
 * Routes
 *   GET /articles/:id
 */

router.route('/:id')
  .all(ArticlesController.find_or_404)
  .get(ArticlesController.show)

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
