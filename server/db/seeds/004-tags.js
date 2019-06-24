'use strict'

exports.seed = function(knex, Promise) {
  return knex('tags').del()
    .then(function () {
      return knex('tags').insert([
        {id: 1, title: 'General'},
        {id: 2, title: 'Productivity'},
        {id: 3, title: 'Science'}
      ])
    })
}
