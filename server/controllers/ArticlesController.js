'use strict'

/**
 * Dependencies
 */

const Article = require('../models/Article')
const Step = require('../models/Step')
const ArticleTag = require('../models/ArticleTag')

/**
 * Define controller
 */

class ArticlesController {
  static async find_or_404(req, res, next) {
    try {
      const article = await Article.find({ id: (req.params.article_id || req.params.id) })

      if (article) {
        next()
      } else {
        res.status(404).json({ error: { message: 'Article not found' } })
      }
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async published_index(req, res) {
    try {
      let filter = {}
      if (req.query.q) filter.q = req.query.q
      if (req.query.tag) filter.tag = req.query.tag
      if (req.query.author) filter.author_username = req.query.author
      let articles

      if (Object.keys(filter).length > 0) {
        articles = await Article.all_published(filter)
      } else {
        articles = await Article.all_published()
      }

      res.status(200).json(articles)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async authors_index(req, res) {
    try {
      const user_id = req.decoded.subject
      const articles = await Article.all_authors(user_id)

      res.status(200).json(articles)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async create(req, res) {
    try {
      const user_id = req.decoded.subject
      const article = await Article.create(user_id, req.body)

      res.status(201).json(article)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async show(req, res) {
    try {
      const article = await Article.find({ id: req.params.id })

      article.steps = await Step.all({ article_id: article.id })
      article.tags = await ArticleTag.all({ article_id: article.id })

      res.status(200).json(article)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async like(req, res) {
    try {
      const article = await Article.like({ id: req.params.id })

      article.steps = await Step.all({ article_id: article.id })
      article.tags = await ArticleTag.all({ article_id: article.id })

      res.status(200).json(article)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async update(req, res) {
    try {
      const user_id = req.decoded.subject
      const article = await Article.update(req.params.id, req.body, user_id)

      if (article) {
        article.steps = await Step.all({ article_id: article.id })
        article.tags = await ArticleTag.all({ article_id: article.id })

        res.status(200).json(article)
      } else {
        res.status(403).json({ error: { message: 'You can only edit your articles.' } })
      }
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async destroy(req, res) {
    try {
      const user_id = req.decoded.subject
      const article = await Article.destroy(req.params.id, user_id)

      if (article) {
        res.status(200).json()
      } else {
        res.status(403).json({ error: { message: 'You can only delete your articles.' } })
      }
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }
}

/**
 * Export controller
 */

module.exports = ArticlesController
