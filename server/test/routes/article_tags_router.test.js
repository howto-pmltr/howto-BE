'use strict'

/**
 * Dependencies
 */

const supertest = require('supertest')
const app = require('../../app')
const db = require('../../db/client')
const signin = require('../helpers/signin')

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

  describe('article_tags_router.js', () => {
    test('GET /articles/:article_id/tags - success', async () => {
      const res = await supertest(app).get('/articles/1/tags')
      expect(res.status).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body.constructor).toBe(Array)
      expect(res.body.length).toBe(2)
    })

    test('GET /articles/:article_id/tags - return empty array if no tags', async () => {
      await db('article_tags').del()

      const res = await supertest(app).get('/articles/1/tags')
      expect(res.status).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body.constructor).toBe(Array)
      expect(res.body.length).toBe(0)
    })

    test('POST /articles/:article_id/tags - authorization required', async () => {
      const res = await supertest(app).post('/articles/1/tags')
      expect(res.status).toBe(401)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body).toMatchObject({ error: { message: 'No token provided, must be set on the Authorization Header' } })
    })

    test('POST /articles/:article_id/tags - success', async () => {
      const token = await signin(app)

      const res = await supertest(app).post('/articles/1/tags')
        .set('Authorization', token)
        .send({ tag_title: 'General' })
      expect(res.status).toBe(201)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
    })

    test('POST /articles/:article_id/tags - missing request body', async () => {
      const token = await signin(app)

      const res = await supertest(app).post('/articles/1/tags')
    })

    test('POST /articles/:article_id/tags - missing request body fields', async () => {
      const token = await signin(app)

      const res = await supertest(app).post('/articles/1/tags')
    })

    test('PUT /articles/:article_id/tags/:id - authorization required', async () => {
      const res = await supertest(app).put('/articles/1/tags/1')
      expect(res.status).toBe(401)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body).toMatchObject({ error: { message: 'No token provided, must be set on the Authorization Header' } })
    })

    test('PUT /articles/:article_id/tags/:id - success', async () => {
      const token = await signin(app)

      const res = await supertest(app).put('/articles/1/tags/1')
    })

    test('PUT /articles/:article_id/tags/:id - not found', async () => {
      const token = await signin(app)

      const res = await supertest(app).put('/articles/1/tags/1')
    })

    test('DELETE /articles/:article_id/tags/:id - success', async () => {
      const token = await signin(app)

      const res = await supertest(app).delete('/articles/1/tags/1')
    })

    test('DELETE /articles/:article_id/tags/:id - not found', async () => {
      const token = await signin(app)

      const res = await supertest(app).delete('/articles/1/tags/1')
    })
  })
})
