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
      expect(res.body).toMatchObject({ error: { message: 'User with that username already exists.' } })
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
      expect(res.body).toMatchObject({ error: { message: 'User with that email already exists.' } })
    })

    test('POST /users/signin - success', async () => {
      const res = await supertest(app).post('/users/signin').send({
        username: 'john',
        password: 'secret'
      })
      expect(res.status).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(Object.keys(res.body)).toEqual(expect.arrayContaining(['user', 'token']))
    })

    test('POST /users/signin - invalid credentials', async () => {
      const res = await supertest(app).post('/users/signin').send({
        username: 'john',
        password: 'not-correct-password'
      })
      expect(res.status).toBe(401)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body).toMatchObject({ error: { message: 'Invalid Credentials' } })
    })

    test('POST /users/signin - user not found', async () => {
      const res = await supertest(app).post('/users/signin').send({
        username: 'samantha',
        password: 'secret'
      })
      expect(res.status).toBe(404)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body).toMatchObject({ error: { message: 'User not found for samantha' }})
    })

    test('POST /users/:id/articles - success', async () => {
      const token = await signin(app)

      const res = await supertest(app).post('/users/1/articles')
        .set('Authorization', token)
        .send({
          author_username: 'john',
          title: 'How To Example #2',
          description: 'This is an example how-to article #2.'
        })
      expect(res.status).toBe(201)
    })

    test('POST /users/:id/articles - authorization required', async () => {
      const res = await supertest(app).post('/users/1/articles')
        .send({
          author_username: 'john',
          title: 'How To Example #2',
          description: 'This is an example how-to article #2.'
        })
      expect(res.status).toBe(401)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body).toMatchObject({ error: { message: 'No token provided, must be set on the Authorization Header' } })
    })

    test('POST /users/:id/articles - missing request body', async () => {
      const token = await signin(app)

      const res = await supertest(app).post('/users/1/articles').set('Authorization', token)
      expect(res.status).toBe(422)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body).toMatchObject({ error: { message: 'Missing request body' } })
    })

    test('POST /users/:id/articles - missing request body fields', async () => {
      const token = await signin(app)

      const res = await supertest(app).post('/users/1/articles')
        .set('Authorization', token)
        .send({author_username: 'john'})
      expect(res.status).toBe(422)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body).toMatchObject({ error: { message: 'Missing fields: title' } })
    })

    test('PUT /users/:user_id/articles/:id - success', async () => {
      const token = await signin(app)

      const res = await supertest(app).put('/users/1/articles/1')
        .set('Authorization', token)
        .send({
          title: 'How To Example',
          description: 'This is an example how-to article.'
        })
      expect(res.status).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
    })

    test('PUT /users/:user_id/articles/:id - authorization required', async () => {
      const res = await supertest(app).put('/users/1/articles/1')
        .send({
          title: 'How To Example',
          description: 'This is an example how-to article.'
        })
      expect(res.status).toBe(401)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body).toMatchObject({ error: { message: 'No token provided, must be set on the Authorization Header' } })
    })

    test('PUT /users/:user_id/articles/:id - user not found', async () => {
      const token = await signin(app)

      const res = await supertest(app).put('/users/99/articles/1')
        .set('Authorization', token)
        .send({
          title: 'How To Example',
          description: 'This is an example how-to article.'
        })
      expect(res.status).toBe(404)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body).toMatchObject({ error: { message: 'User not found' } })
    })

    test('PUT /users/:user_id/articles/:id - article not found', async () => {
      const token = await signin(app)

      const res = await supertest(app).put('/users/1/articles/99')
        .set('Authorization', token)
        .send({
          title: 'How To Example',
          description: 'This is an example how-to article.'
        })
      expect(res.status).toBe(404)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body).toMatchObject({ error: { message: 'Article not found' } })
    })

    test('DELETE /users/:user_id/articles/:id - success', async () => {
      const res = await supertest(app).delete('/users/1/articles')
      expect(res.status).toBe(200)
    })

    test.only('DELETE /users/:user_id/articles/:id - authorization required', async () => {
      const res = await supertest(app).delete('/users/1/articles')
      expect(res.status).toBe(401)
      expect(res.type).toBe('application/json')
      expect(res.body).toBeTruthy()
      expect(res.body).toMatchObject({ error: { message: 'No token provided, must be set on the Authorization Header' } })
    })

    test('DELETE /users/:user_id/articles/:id - not found', async () => {
      const res = await supertest(app).delete('/users/1/articles')
      expect(res.status).toBe(200)
    })
  })
})
