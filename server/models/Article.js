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

  static async create(article) {
    const [ids] = await db('articles').insert({
      author_username: article.author_username,
      title: article.title,
      image_path: article.image_path,
      description: article.description,
    }, ['id'])

    const new_article = await db('articles').where({ id: ids.id }).first()

    return new_article
  }

  static async find(filter) {
    return await db('articles').where(filter).first()
  }

  static async update(id, article) {
    const changes = {}
    if (article.title) changes.title = article.title
    if (article.image_path) changes.image_path = article.image_path
    if (article.description) changes.description = article.description
    if (article.published_at === true) {
      changes.published_at = new Date()
    } else {
      changes.published_at = null
    }
    changes.updated_at = new Date()

    await db('articles').where({ id: id }).update(changes)

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
