'use strict'

/**
 * Dependencies
 */

const Tag = require('../models/Tag')

/**
 * Define controller
 */

class TagsController {
  static async find_or_404(req, res, next) {
    try {
      const tag_id = (req.params.tag_id) ? req.params.tag_id : req.params.id
      const tag = await Tag.find({ id: (req.params.tag_id || req.params.id) })

      if (tag) {
        next()
      } else {
        res.status(404).json({ error: { message: 'Tag not found' } })
      }
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async index(req, res) {
    try {
      const tags = await Tag.all()

      res.status(200).json(tags)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async create(req, res) {
    try {
      const tag = await Tag.find({ title: req.body.title })
      if (tag) {
        return res.status(400).json({ error: { message: 'Tag with that title already exists' } })
      }

      const new_tag = await Tag.create(req.body)

      res.status(201).json(new_tag)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async show(req, res) {
    try {
      const tag = await Tag.find({ id: req.params.id })

      res.status(200).json(tag)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async update(req, res) {
    try {
      const tag = await Tag.update(req.params.id, req.body)

      res.status(200).json(tag)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async destroy(req, res) {
    try {
      await Tag.destroy(req.params.id)

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

module.exports = TagsController
