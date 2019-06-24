'use strict'

exports.up = function(knex, Promise) {
  return knex.schema.createTable('steps', table => {
    table.increments('id')
    table.integer('article_id').notNullable()
    table.integer('order').notNullable()
    table.text('title').notNullable()
    table.text('content')
    table.text('image_path')
    table.timestamps(true ,true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('steps')
}
