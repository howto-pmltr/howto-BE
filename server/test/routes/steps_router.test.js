'use strict'

/**
 * Dependencies
 */

const supertest = require('supertest')
const app = require('../../app')
const db = require('../../db/client')

/**
 * Hooks
 */

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.migrate.rollback(null, true)
})

/**
 * Assertions
 */

describe('routes', () => {
  test('NODE_ENV=test', () => {
    expect(process.env.NODE_ENV).toBe('test')
  })

  describe('steps_router.js', () => {
    test.todo('GET /articles/:article_id/steps - success')
    test.todo('GET /articles/:article_id/steps - return empty array if no steps')
    test.todo('POST /articles/:article_id/steps - success')
    test.todo('POST /articles/:article_id/steps - missing request body')
    test.todo('POST /articles/:article_id/steps - missing request body fields')
    test.todo('GET /articles/:article_id/steps/:id - success')
    test.todo('GET /articles/:article_id/steps/:id - not found')
    test.todo('PUT /articles/:article_id/steps/:id - success')
    test.todo('PUT /articles/:article_id/steps/:id - not found')
    test.todo('DELETE /articles/:article_id/steps/:id - success')
    test.todo('DELETE /articles/:article_id/steps/:id - not found')
  })
})
