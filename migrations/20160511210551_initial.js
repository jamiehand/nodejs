
exports.up = function(knex, Promise) {
  /* knex expects a promise, so make sure you write 'return' here;
   * this helps solve JS's 'asynchronous problem'
   * promise represents an eventual value: so this return statement
   * says it will have a value (it represents a promise for the
   * future value). */
  return knex.schema.createTable('course', function(table){
      table.increments('id').primary();  // makes it so id will auto-increment
      table.string('name');
      table.string('code');
  })
};

exports.down = function(knex, Promise) {
  // could do Promise.all() to do a bunch of things before fulfilling the
  // promise [i.e. before returning?]
  return knex.schema.dropTable('course');
};
