'use strict'

/**
 * Dependencies
 */

const knex = require('knex')
const knexfile = require('../../knexfile')

/**
 * Define client
 */

let client

switch(process.env.NODE_ENV) {
  case 'production':
    client = knex(knexfile.production)
    break
  case 'test':
    client = knex(knexfile.test)
    break
  default:
    client = knex(knexfile.development)
}

/**
 * Export client
 */

module.exports = client
