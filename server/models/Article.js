'use strict'

/**
 * Dependencies
 */

const db = require('../db/client')

/**
 * Define model
 */

class Article {
  static async all_published(filter) {
    if (filter) {
      return await db('articles').whereNotNull('published_at').where(filter)
    } else {
      return await db('articles').whereNotNull('published_at')
    }
  }

  static async all_authors(id) {
    const user = await db('users').where({ id: id }).first()

    return await db('articles').where({ author_username: user.username })
  }

  static async create(user_id, article) {
    const changes = {}

    if (article.title) changes.title = article.title
    if (article.image_path) changes.image_path = article.image_path
    if (article.description) changes.description = article.description
    if (article.published_at === 'true') {
      changes.published_at = new Date()
    } else {
      changes.published_at = null
    }

    const user = await db('users').where({ id: user_id }).first()
    article.author_username = user.username

    const [ids] = await db('articles').insert(changes, ['id'])

    const new_article = await db('articles').where({ id: ids.id }).first()

    return new_article
  }

  static async find(filter) {
    return await db('articles').where(filter).first()
  }

  static async update(id, article, user_id) {
    const changes = {}
    if (article.title) changes.title = article.title
    if (article.image_path) changes.image_path = article.image_path
    if (article.description) changes.description = article.description
    if (article.published_at === 'true') {
      changes.published_at = new Date()
    } else {
      changes.published_at = null
    }
    changes.updated_at = new Date()

    const user = await db('users').where({ id: user_id }).first()
    const old_article = await db('articles').where({ id: id }).first()
    if (user.username !== old_article.author_username) {
      return false
    }

    await old_article.update(changes)
    const new_article = await db('articles').where({ id: id }).first()

    return new_article
  }

  static async destroy(id) {
    return await db('articles').where({ id: id }).del()
  }
}

/**
 * Export model
 */

module.exports = Article
