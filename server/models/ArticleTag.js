'use strict'

/**
 * Dependencies
 */

const db = require('../db/client')

/**
 * Define model
 */

class ArticleTag {
  static async all(filter) {
    if (filter) {
      return await db('article_tags').where(filter).orderBy('tag_title', 'asc')
    } else {
      return await db('article_tags').orderBy('tag_title', 'asc')
    }
  }

  static async create(user_id, article_id, tag_title) {
    const user = await db('users').where({ id: user_id }).first()
    const article = await db('articles').where({ id: article_id }).first()
    if (user.username !== article.author_username) {
      return false
    }

    const changes = { article_id: article_id, tag_title: tag_title }

    if (process.env.NODE_ENV === 'production') {
      const [returning_obj] = await db('article_tags').insert(changes, ['id'])
      const new_article_tag = await db('article_tags').where({ id: returning_obj.id }).first()
      return new_article_tag
    } else {
      const [id] = await db('article_tags').insert(changes)
      const new_article_tag = await db('article_tags').where({ id: id }).first()
      return new_article_tag
    }
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
