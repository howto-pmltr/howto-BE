'use strict'

/**
 * Dependencies
 */

const express = require('express')
const helmet = require('helmet')

/**
 * Constants
 */

const port = process.env.PORT || 8080

/**
 * Define app
 */

const app = express()

/**
 * Config
 */

app.disable('x-powered-by')

/**
 * Middleware
 */

app.use(helmet())
app.use(express.json())

/**
 * Routes
 */

app.get('/', (req, res) => {
  res.sendStatus(200)
})

/**
 * Start server
 */

if (module === require.main) {
  app.listen(port, () => {
    console.log(`Express running on port ${port}`)
  })
}

/**
 * Export app
 */

module.exports = app
