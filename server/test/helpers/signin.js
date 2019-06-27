'use strict'

/**
 * Dependencies
 */

const supertest = require('supertest')

/**
 * Define helper
 */

async function signin(app) {
  const res = await supertest(app).post('/users/signin').send({
    username: 'john',
    password: 'secret'
  })

  return res.body.token
}

/**
 * Export helper
 */

module.exports = signin
