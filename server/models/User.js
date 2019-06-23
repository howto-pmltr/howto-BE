'use strict'

/**
 * Dependencies
 */

const db = require('../db/client')

/**
 * Define model
 */

class User {
  static async all() {
    return await db('users')
  }

  static async create(user) {
    const [id] = await db('users').insert({
      email: user.email
    })

    const new_user = await db('users').where({ id: id }).first()

    return new_user
  }

  static async find(filter) {
    return await db('users').where(filter).first()
  }

  static async update(id, user) {
    const changes = {}
    changes.updated_at = new Date()

    await db('users').where({ id: id }).update(changes)

    const new_user = await db('users').where({ id: id }).first()

    return new_user
  }

  static async destroy(id) {
    return await db('users').where({ id: id }).del()
  }

  static async email_uniqueness_check(email) {
    const user = await db('users').where({ email: email }).first()

    if (user) {
      return false
    } else {
      return true
    }
  }
}

/**
 * Export model
 */

module.exports = User