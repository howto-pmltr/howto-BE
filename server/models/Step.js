'use strict'

/**
 * Dependencies
 */

const db = require('../db/client')

/**
 * Define model
 */

class Step {
  static async all() {
    return await db('steps')
  }

  static async create(step) {
    const [id] = await db('steps').insert({
      title: step.title,
      content: step.content
    })

    const new_step = await db('steps').where({ id: id }).first()

    return new_step
  }

  static async find(filter) {
    return await db('steps').where(filter).first()
  }

  static async update(id, step) {
    const changes = {}
    changes.updated_at = new Date()

    await db('steps').where({ id: id }).update(changes)

    const new_step = await db('steps').where({ id: id }).first()

    return new_step
  }

  static async destroy(id) {
    return await db('steps').where({ id: id }).del()
  }
}

/**
 * Export model
 */

module.exports = Step
