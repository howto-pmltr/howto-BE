'use strict'

/**
 * Dependencies
 */

const Tag = require('../../models/Tag')
const db = require('../../db/client')

/**
 * Assertions
 */

describe('models', () => {
  test('NODE_ENV=test', () => {
    expect(process.env.NODE_ENV).toBe('test')
  })

  describe('Tag.js', () => {
    test.todo('#all')
    test.todo('#create')
    test.todo('#find')
    test.todo('#update')
    test.todo('#destroy')
  })
})
