'use strict'

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {id: 1, username: 'john', email: 'john@company.com', password_hash: '$2a$10$dFIAtS9lM3K2zNhbOnx3tuCG04MpXRd/lMMZ64PHe3G/8KNZMPHSK'},
        {id: 2, username: 'jane', email: 'jane@company.com', password_hash: '$2a$10$dFIAtS9lM3K2zNhbOnx3tuCG04MpXRd/lMMZ64PHe3G/8KNZMPHSK'},
      ])
    })
}
