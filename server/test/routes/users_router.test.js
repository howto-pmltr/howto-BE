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

  describe('users_router.js', () => {
    test('POST /users/signup - success', async () => {
      const res = await supertest(app).post('/users/signup').send({
        username: 'samantha',
        email: 'samantha@company.com',
        password: 'secret'
      })
      expect(res.status).toBe(201)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(Object.keys(res.body)).toEqual(expect.arrayContaining(['user', 'token']))
    })

    test('POST /users/signup - username already exists', async () => {
      const res = await supertest(app).post('/users/signup').send({
        username: 'john',
        email: 'john@new-company.com',
        password: 'secret'
      })
      expect(res.status).toBe(400)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body[0]).toMatchObject({ error: { message: 'User with that username already exists.' } })
    })

    test('POST /users/signup - email already exists', async () => {
      const res = await supertest(app).post('/users/signup').send({
        username: 'new-john',
        email: 'john@company.com',
        password: 'secret'
      })
      expect(res.status).toBe(400)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body[0]).toMatchObject({ error: { message: 'User with that email already exists.' } })
    })

    test('POST /users/signin - success', async () => {
      const res = await supertest(app).post('/users/signin').send({
        username: 'john',
        password: 'secret'
      })
      expect(res.status).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(Object.keys(res.body)).arrayContaining(['user', 'token'])
    })
  })
})
