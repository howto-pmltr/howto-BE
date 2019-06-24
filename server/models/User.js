'use strict'

/**
 * Dependencies
 */

const jsonwebtoken = require('jsonwebtoken')
const db = require('../db/client')
const secrets = require('../config/secrets')

/**
 * Define model
 */

class User {
  static async all() {
    return await db('users')
  }

  static async create(user) {
    const [ids] = await db('users').insert({
      username: user.username,
      email: user.email,
      password_hash: user.password_hash
    }, ['id'])

    const new_user = await db('users').where({ id: ids.id }).first()

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

  static async generate_token(user) {
    const payload = {
      subject: user.id,
      email: user.email
    }

    const options = {
      expiresIn: '1d',
    }

    return jsonwebtoken.sign(payload, secrets.jsonwebtoken_secret, options)
  }
}

/**
 * Export model
 */

module.exports = User
