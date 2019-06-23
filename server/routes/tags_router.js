'use strict'

/**
 * Dependencies
 */

const express = require('express')
const require_body = require('../middleware/checks/require_body')
const TagsController = require('../controllers/TagsController')

/**
 * Define router
 */

const router = express.Router()

/**
 * Routes
 *   GET,POST /tags
 */

router.route('/')
  .get(TagsController.index)
  .all(require_body(['title']))
  .post(TagsController.create)

/**
 * Routes
 *   GET,PUT,DELETE /tags/:id
 */

router.route('/:id')
  .all(TagsController.find_or_404)
  .get(TagsController.show)
  .put(TagsController.update)
  .delete(TagsController.destroy)

/**
 * Export router
 */

module.exports = router
