
exports.up = function(knex) {
  return knex.schema.createTable('milestones', (table) => {
    table.increments();
    table.timestamps();
    table.string('description').notNullable();
    table.date('date_achieved').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('milestones');
};
