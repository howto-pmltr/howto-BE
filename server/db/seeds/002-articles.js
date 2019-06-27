'use strict'

exports.seed = function(knex, Promise) {
  return knex('articles').del()
    .then(function () {
      return knex('articles').insert([
        {
          id: 1,
          author_username: 'john',
          title: 'How To Example #1',
          description: 'This is an example how-to article #1.'
        },
      ])
    })
}
