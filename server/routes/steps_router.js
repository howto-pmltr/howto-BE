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

const router = express.Router()

/**
 * Routes
 *   GET,POST /steps
 */

router.route('/')
  .get(StepsController.index)
  .all(require_body(['article_id', 'order', 'title']))
  .post(StepsController.create)

/**
 * Routes
 *   GET,PUT,DELETE /steps/:id
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
