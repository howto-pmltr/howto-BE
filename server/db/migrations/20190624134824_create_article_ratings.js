'use strict'

exports.up = function(knex, Promise) {
  return knex.schema.createTable('article_ratings', table => {
    table.increments('id')
    table.integer('article_id').notNullable()
    table.integer('rating').notNullable()
    table.text('author_username')
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('article_ratings')
}
