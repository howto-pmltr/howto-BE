'use strict'

exports.seed = function(knex, Promise) {
  return knex('steps').del()
    .then(function () {
      return knex('steps').insert([
        {
          id: 1,
          article_id: 1,
          order: 1,
          title: 'Step #1',
          content: 'This is step #1 content.',
        },
        {
          id: 2,
          article_id: 1,
          order: 2,
          title: 'Step #2',
          content: 'This is step #2 content.',
        },
        {
          id: 3,
          article_id: 1,
          order: 3,
          title: 'Step #3',
          content: 'This is step #3 content.',
        }
      ])
    })
}
