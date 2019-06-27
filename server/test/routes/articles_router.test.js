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

  describe('articles_router.js', () => {
    test.todo('GET /articles - success')
    test.todo('GET /articles - return empty array if no articles')
    test.todo('POST /articles - success')
    test.todo('POST /articles - missing request body')
    test.todo('POST /articles - missing request body fields')
    test.todo('GET /articles/:id - success')
    test.todo('GET /articles/:id - not found')
    test.todo('PUT /articles/:id - success')
    test.todo('PUT /articles/:id - not found')
    test.todo('DELETE /articles/:id - success')
    test.todo('DELETE /articles/:id - not found')
  })
})
