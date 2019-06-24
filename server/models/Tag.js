'use strict'

/**
 * Dependencies
 */

const db = require('../db/client')

/**
 * Define model
 */

class Tag {
  static async all() {
    return await db('tags')
  }

  static async create(tag) {
    const [id] = await db('tags').insert({
      title: tag.title
    })

    const new_tag = await db('tags').where({ id: id }).first()

    return new_tag
  }

  static async find(filter) {
    return await db('tags').where(filter).first()
  }

  static async update(id, tag) {
    const changes = {}
    changes.updated_at = new Date()

    await db('tags').where({ id: id }).update(changes)

    const new_tag = await db('tags').where({ id: id }).first()

    return new_tag
  }

  static async destroy(id) {
    return await db('tags').where({ id: id }).del()
  }

  static async title_uniqueness_check(title) {
    const tag = await db('tags').where({ title: title }).first()

    if (tag) {
      return false
    } else {
      return true
    }
  }
}

/**
 * Export model
 */

module.exports = Tag
