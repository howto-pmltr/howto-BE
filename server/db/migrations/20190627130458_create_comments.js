'use strict'

exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', table => {
    table.increments('id')
    table.integer('user_id').notNullable()
    table.integer('article_id').notNullable()
    table.text('message')
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments')
}
