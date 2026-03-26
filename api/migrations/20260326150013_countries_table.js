/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('countries', table => {
    table.increments();
    table.string('name').notNullable();
    table.string('official_name');
    table.string('capital');
    table.string('cca2');
    table.string('flag');
    table.string('coat_of_arms');
    table.integer('population');
    table.double('gini');
    table.double('gdp');
    table.double('area');
    table.string('region');
    table.string('map');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('countries');
};
