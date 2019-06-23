'use strict'

/**
 * Dependencies
 */

const db = require('../db/client')

/**
 * Define model
 */

class ArticleTag {
  static async all() {
    return await db('article_tags')
  }

  static async create(tag) {
    const [id] = await db('article_tags').insert({
      article_id: tag.article_id,
      tag_title: tag.tag_title
    })

    const new_tag = await db('article_tags').where({ id: id }).first()

    return new_tag
  }

  static async find(filter) {
    return await db('article_tags').where(filter).first()
  }

  static async update(id, tag) {
    const changes = {}
    changes.updated_at = new Date()

    await db('article_tags').where({ id: id }).update(changes)

    const new_tag = await db('article_tags').where({ id: id }).first()

    return new_tag
  }

  static async destroy(id) {
    return await db('article_tags').where({ id: id }).del()
  }
}

/**
 * Export model
 */

module.exports = ArticleTag
