'use strict'

/**
 * Dependencies
 */

const express = require('express')
const require_body = require('../middleware/checks/require_body')
const StepsController = require('../controllers/StepsController')

/**
 * Define router
 */

const router = express.Router({ mergeParams: true })

/**
 * Routes
 *   POST /users/:user_id/articles/:article_id/steps
 */

router.route('/')
  .all(require_body(['step_number', 'title']))
  .post(StepsController.create)

/**
 * Routes
 *   GET,PUT,DELETE /users/:user_id/articles/:article_id/steps/:id
 */

router.route('/:id')
  .all(StepsController.find_or_404)
  .get(StepsController.show)
  .put(StepsController.update)
  .delete(StepsController.destroy)

/**
 * Export router
 */

module.exports = router
