'use strict'

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id')
    table.text('username').notNullable().unique()
    table.text('email').notNullable().unique()
    table.text('password_hash').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
