'use strict'

/**
 * Dependencies
 */

const Step = require('../../models/Step')
const db = require('../../db/client')

/**
 * Assertions
 */

describe('models', () => {
  test('NODE_ENV=test', () => {
    expect(process.env.NODE_ENV).toBe('test')
  })

  describe('Step.js', () => {
    test.todo('#all')
    test.todo('#create')
    test.todo('#find')
    test.todo('#update')
    test.todo('#destroy')
  })
})
