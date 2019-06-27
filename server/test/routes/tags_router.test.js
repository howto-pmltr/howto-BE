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

  describe('tags_router.js', () => {
    test.todo('GET /tags - success')
    test.todo('GET /tags - return empty array if no tags')
    test.todo('POST /tags - success')
    test.todo('POST /tags - missing request body')
    test.todo('POST /tags - missing request body fields')
    test.todo('GET /tags/:id - success')
    test.todo('GET /tags/:id - not found')
    test.todo('PUT /tags/:id - success')
    test.todo('PUT /tags/:id - not found')
    test.todo('DELETE /tags/:id - success')
    test.todo('DELETE /tags/:id - not found')
  })
})
