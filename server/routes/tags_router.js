'use strict'

/**
 * Dependencies
 */

const express = require('express')
const require_body = require('../middleware/checks/require_body')
const TagsController = require('../controllers/TagsController')
const AuthController = require('../controllers/AuthController')

/**
 * Define router
 */

const router = express.Router({ mergeParams: true })

/**
 * Routes
 *   GET,POST /tags
 */

router.route('/')
  .get(TagsController.index)
  .all(AuthController.require_jwt_token)
  .all(require_body(['title']))
  .post(TagsController.create)

/**
 * Export router
 */

module.exports = router
