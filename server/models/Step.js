'use strict'

/**
 * Dependencies
 */

const db = require('../db/client')

/**
 * Define model
 */

class Step {
  static async all(filter) {
    if (filter) {
      return await db('steps').where(filter).orderBy('step_number', 'desc')
    } else {
      return await db('steps')
    }
  }

  static async create(user_id, article_id, step) {
    const changes = {}

    changes.article_id = article_id
    if (step.image_path) changes.image_path = step.image_path
    if (step.title) changes.title = step.title
    if (step.content) changes.content = step.content
    if (step.step_number) changes.step_number = step.step_number

    const user = await db('users').where({ id: user_id }).first()
    const article = await db('articles').where({ id: article_id }).first()
    if (user.username !== article.author_username) {
      return false
    }

    const [ids] = await db('steps').insert(changes, ['id'])

    const new_step = await db('steps').where({ id: ids.id }).first()

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
