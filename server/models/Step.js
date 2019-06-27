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
      return await db('steps').where(filter).orderBy('step_number', 'asc')
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

    if (process.env.NODE_ENV === 'production') {
      const [returning_obj] = await db('steps').insert(changes, ['id'])
      const new_step = await db('steps').where({ id: returning_obj.id }).first()
      return new_step
    } else {
      const [id] = await db('steps').insert(changes)
      const new_step = await db('steps').where({ id: id }).first()
      return new_step
    }
  }

  static async find(filter) {
    return await db('steps').where(filter).first()
  }

  static async update(user_id, id, step) {
    const changes = {}
    if (step.title) changes.title = step.title
    if (step.image_path) changes.image_path = step.image_path
    if (step.step_number) changes.step_number = step.step_number
    if (step.content) changes.content = step.content
    changes.updated_at = new Date()

    const old_step = await db('steps').where({ id: id }).first()
    const user = await db('users').where({ id: user_id }).first()
    const article = await db('articles').where({ id: old_step.article_id }).first()
    if (!article || user.username !== article.author_username) {
      return false
    }

    await db('steps').where({ id: id }).update(changes)

    const new_step = await db('steps').where({ id: id }).first()

    return new_step
  }

  static async destroy(user_id, id) {
    const old_step = await db('steps').where({ id: id }).first()
    const user = await db('users').where({ id: user_id }).first()
    const article = await db('articles').where({ id: old_step.article_id }).first()
    if (user.username !== article.author_username) {
      return false
    }

    return await db('steps').where({ id: id }).del()
  }
}

/**
 * Export model
 */

module.exports = Step
