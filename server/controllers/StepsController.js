'use strict'

/**
 * Dependencies
 */

const Step = require('../models/Step')

/**
 * Define controller
 */

class StepsController {
  static async find_or_404(req, res, next) {
    try {
      const step = await Step.find({ id: req.params.id })

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

  static async index(req, res) {
    try {
      const steps = await Step.all()

      res.status(200).json(steps)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async create(req, res) {
    try {
      const step = await Step.create(req.body)

      res.status(201).json(step)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async show(req, res) {
    try {
      const step = await Step.find({ id: req.params.id })

      res.status(200).json(step)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async update(req, res) {
    try {
      const step = await Step.update(req.params.id, req.body)

      res.status(200).json(step)
    } catch(err) {
      console.error(err)
      res.status(500).json({ error: { message: 'Internal Server Error' } })
    }
  }

  static async destroy(req, res) {
    try {
      await Step.destroy(req.params.id)

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

module.exports = StepsController
