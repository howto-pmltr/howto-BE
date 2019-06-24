'use strict'

exports.up = function(knex, Promise) {
  return knex.schema.createTable('article_tags', table => {
    table.increments('id')
    table.integer('article_id').notNullable()
    table.text('tag_title').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('article_tags')
}
