'use strict'

exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', table => {
    table.increments('id')
    table.text('author_email').notNullable()
    table.text('title').notnullable()
    table.text('description')
    table.datetime('published_at')
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.createTable('articles')
}
