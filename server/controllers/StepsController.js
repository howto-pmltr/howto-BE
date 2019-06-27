'use strict'

/**
 * Dependencies
 */

const Step = require('../models/Step')
const Article = require('../models/Article')
const ArticleTag = require('../models/ArticleTag')

/**
 * Define controller
 */

class StepsController {
  static async find_or_404(req, res, next) {
    try {
      const step = await Step.find({ id: (req.params.step_id || req.params.id) })

      if (step) {
        next()
      } else {
        res.status(404).json({ error: { message: 'Step not found' } })
      }
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async create(req, res) {
    try {
      const user_id = req.decoded.subject
      const step = await Step.create(user_id, req.params.article_id, req.body)

      if (step) {
        const article = await Article.find({ id: step.article_id })
        article.steps = await Step.all({ article_id: article.id })
        article.tags = await ArticleTag.all({ article_id: article.id })

        res.status(201).json(article)
      } else {
        res.status(403).json({ error: { message: 'You can only add steps to your articles.' } })
      }
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async update(req, res) {
    try {
      const user_id = req.decoded.subject
      const step = await Step.update(user_id, req.params.id, req.body)

      if (step) {
        const article = await Article.find({ id: step.article_id })
        article.steps = await Step.all({ article_id: article.id })
        article.tags = await ArticleTag.all({ article_id: article.id })

        res.status(200).json(article)
      } else {
        res.status(403).json({ error: { message: 'You can only update your articles.' } })
      }
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async destroy(req, res) {
    try {
      const user_id = req.decoded.subject
      const is_successful = await Step.destroy(user_id, req.params.id)

      if (is_successful) {
        res.status(200).json()
      } else {
        res.status(403).json({ error: { message: 'You can only add steps to your articles.' } })
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

module.exports = StepsController
