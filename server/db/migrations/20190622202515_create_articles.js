'use strict'

exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', table => {
    table.increments('id')
    table.text('author_username').notNullable()
    table.text('title').notNullable()
    table.text('description')
    table.text('image_path')
    table.integer('likes_count')
    table.integer('views_count').defaultTo(0)
    table.datetime('published_at')
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles')
}
