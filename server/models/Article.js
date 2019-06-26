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
      // return await db.from('articles')
      //   .select({
      //     id: 'articles.id',
      //     author_username: 'articles.author_username',
      //     title: 'articles.title',
      //     description: 'articles.description',
      //     published_at: 'articles.published_at',
      //     likes_count: 'articles.likes_count',
      //     created_at: 'articles.created_at'
      //   })
      //   .innerJoin('article_tags', 'articles.id', 'article_tags.article_id')

      if (filter.author_username) {
        return await db('articles').whereNotNull('published_at')
          .where({ author_username: filter.author_username })
      } else if (filter.tags) {
        return await db('articles').whereNotNull('published_at')
        // TODO
      } else if (filter.q) {
        return await db('articles').whereNotNull('published_at')
          .where('title', 'like', `%${filter.q}%`)
          .orWhere('description', 'like', `%${filter.q}%`)
      } else {
        return await db('articles').whereNotNull('published_at')
      }
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
    changes.author_username = user.username

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
