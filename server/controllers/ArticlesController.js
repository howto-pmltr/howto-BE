'use strict'

/**
 * Dependencies
 */

const Article = require('../models/Article')

/**
 * Define controller
 */

class ArticlesController {
  static async find_or_404(req, res, next) {
    try {
      const article = await Article.find({ id: req.params.id })

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
      const articles = await Article.all_published()

      res.status(200).json(articles)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async authors_index(req, res) {
    try {
      const articles = await Article.all_authors(req.params.id)

      res.status(200).json(articles)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async create(req, res) {
    try {
      const article = await Article.create(req.body)

      res.status(201).json(article)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async show(req, res) {
    try {
      const article = await Article.find({ id: req.params.id })

      res.status(200).json(article)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async update(req, res) {
    try {
      const article = await Article.update(req.params.id, req.body)

      res.status(200).json(article)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async destroy(req, res) {
    try {
      await Article.destroy(req.params.id)

      res.status(200).json()
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
