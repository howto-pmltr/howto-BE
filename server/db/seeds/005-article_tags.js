'use strict'

exports.seed = function(knex, Promise) {
  return knex('article_tags').del()
    .then(function () {
      return knex('article_tags').insert([
        {id: 1, article_id: 1, tag_title: 'General'},
        {id: 2, article_id: 1, tag_title: 'Productivity'},
      ])
    })
}
