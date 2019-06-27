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

  describe('tags_router.js', () => {
    test('GET /tags - success', async () => {
      const res = await supertest(app).get('/tags')
      expect(res.status).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body.constructor).toBe(Array)
      expect(res.body.length).toBe(3)
    })

    test('GET /tags - return empty array if no tags', async () => {
      await db('tags').del()

      const res = await supertest(app).get('/tags')
      expect(res.status).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body.constructor).toBe(Array)
      expect(res.body.length).toBe(0)
    })

    test('POST /tags - authorization required', async () => {
      const res = await supertest(app).post('/tags')
      expect(res.status).toBe(401)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body).toMatchObject({ error: { message: 'No token provided, must be set on the Authorization Header' } })
    })

    test('POST /tags - success', async () => {
      const token = await signin(app)

      const res = await supertest(app).post('/tags')
        .set('Authorization', token)
        .send({ title: 'New Tag' })
      expect(res.status).toBe(201)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
    })

    test('POST /tags - missing request body', async () => {
      const token = await signin(app)

      const res = await supertest(app).post('/tags')
        .set('Authorization', token)
      expect(res.status).toBe(422)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body).toMatchObject({ error: { message: 'Missing request body' } })
    })

    test('POST /tags - missing request body fields', async () => {
      const token = await signin(app)

      const res = await supertest(app).post('/tags')
        .set('Authorization', token)
      expect(res.status).toBe(422)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
    })
  })
})
