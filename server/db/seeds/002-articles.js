'use strict'

exports.seed = function(knex, Promise) {
  return knex('articles').del()
    .then(function () {
      return knex('articles').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};
