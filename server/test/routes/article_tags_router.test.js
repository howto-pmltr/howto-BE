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
  await db.migrate.rollback(null, true)
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

  describe('article_tags_router.js', () => {
    test.todo('GET /articles/:article_id/tags - success')
    test.todo('GET /articles/:article_id/tags - return empty array if no tags')
    test.todo('POST /articles/:article_id/tags - success')
    test.todo('POST /articles/:article_id/tags - missing request body')
    test.todo('POST /articles/:article_id/tags - missing request body fields')
    test.todo('GET /articles/:article_id/tags/:id - success')
    test.todo('GET /articles/:article_id/tags/:id - not found')
    test.todo('PUT /articles/:article_id/tags/:id - success')
    test.todo('PUT /articles/:article_id/tags/:id - not found')
    test.todo('DELETE /articles/:article_id/tags/:id - success')
    test.todo('DELETE /articles/:article_id/tags/:id - not found')
  })
})
