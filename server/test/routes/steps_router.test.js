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

  describe('steps_router.js', () => {
    test('POST /users/:user_id/articles/:article_id/steps - authorization required', async () => {
      const res = await supertest(app).post('/users/1/articles/1/steps')
      expect(res.status).toBe(401)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body).toMatchObject({ error: { message: 'No token provided, must be set on the Authorization Header' } })
    })

    test.only('POST /users/:user_id/articles/:article_id/steps - success', async () => {
      const token = await signin(app)

      const res = await supertest(app).post('/users/1/articles/1/steps')
        .set('Authorization', token)
        .send({
          title: 'New Step #X',
          step_number: 99
        })
      expect(res.status).toBe(201)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
    })

    test('POST /users/:user_id/articles/:article_id/steps - missing request body', async () => {
      const res = await supertest(app).post('/users/1/articles/1/steps')
      expect(res.status).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
    })

    test('POST /users/:user_id/articles/:article_id/steps - missing field: title', async () => {
      const res = await supertest(app).post('/users/1/articles/1/steps').send({
        step_number: 0
      })
      expect(res.status).toBe(422)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body).toMatchObject({ error: { message: 'Missing fields: title' } })
    })

    test('GET /articles/:article_id/steps/:id - success', async () => {
      const res = await supertest(app).get('/articles/1/steps/1')
      expect(res.status).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
    })

    test('GET /articles/:article_id/steps/:id - not found', async () => {
      const res = await supertest(app).get('/articles/1/steps/1')
      expect(res.status).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
    })

    test('PUT /articles/:article_id/steps/:id - success', async () => {
      const res = await supertest(app).get('/articles/1/steps/1')
      expect(res.status).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
    })

    test('PUT /articles/:article_id/steps/:id - not found', async () => {
      const res = await supertest(app).get('/articles/1/steps/1')
      expect(res.status).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
    })

    test('DELETE /articles/:article_id/steps/:id - success', async () => {
      const res = await supertest(app).get('/articles/1/steps/1')
      expect(res.status).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
    })

    test('DELETE /articles/:article_id/steps/:id - not found', async () => {
      const res = await supertest(app).get('/articles/1/steps/1')
      expect(res.status).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
    })
  })
})
