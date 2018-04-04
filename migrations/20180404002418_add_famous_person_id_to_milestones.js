
exports.up = function(knex) {
  return knex.schema.table('milestones', (table) => {
    table.integer('famous_person_id')
      .notNullable()
      .references('id')
      .inTable('famous_people');
  })
};

exports.down = function(knex) {
  return knex.schema.table('milestones', (table) => {
    table.dropColumn('famous_person_id')
  });
};
