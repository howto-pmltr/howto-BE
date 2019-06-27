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
    test('GET /articles - success', async () => {
      const res = await supertest(app).get('/articles')
      expect(res.status).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body.constructor).toBe(Array)
      expect(res.body.length).toBe(0)
    })

    test('GET /articles/:id - success', async () => {
      const res = await supertest(app).get('/articles/1')
      expect(res.status).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body.title).toBe('How To Example #1')
    })

    test('GET /articles/:id - not found', async () => {
      const res = await supertest(app).get('/articles/99')
      expect(res.status).toBe(404)
      expect(res.type).toBe('application/json')
      expect(res.body).toMatchObject({ error: { message: 'Article not found' } })
    })

    test('POST /articles/:id/like - success', async () => {
      const res = await supertest(app).post('/articles/1/like')
      expect(res.status).toBe(200)
      expect(res.type).toBe('application/json')
    })

    test('POST /articles/:id/like - not found', async () => {
      const res = await supertest(app).post('/articles/99/like')
      expect(res.status).toBe(404)
      expect(res.type).toBe('application/json')
    })
  })
})
