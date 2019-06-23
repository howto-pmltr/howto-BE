'use strict'

/**
 * Dependencies
 */

const ArticleTag = require('../models/ArticleTag')

/**
 * Define controller
 */

class ArticleArticleTagsController {
  static async find_or_404(req, res, next) {
    try {
      const tag = await ArticleTag.find({ id: req.params.id })

      if (tag) {
        next()
      } else {
        res.status(404).json({ error: { message: 'ArticleTag not found' } })
      }
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async index(req, res) {
    try {
      const tags = await ArticleTag.all()

      res.status(200).json(tags)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async create(req, res) {
    try {
      const tag = await ArticleTag.create(req.body)

      res.status(201).json(tag)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async show(req, res) {
    try {
      const tag = await ArticleTag.find({ id: req.params.id })

      res.status(200).json(tag)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async update(req, res) {
    try {
      const tag = await ArticleTag.update(req.params.id, req.body)

      res.status(200).json(tag)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async destroy(req, res) {
    try {
      await ArticleTag.destroy(req.params.id)

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

module.exports = ArticleArticleTagsController