/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('unfiltered_countries', table => {
    table.increments();
    table.string('name').notNullable();
    table.string('official_name');
    table.string('capital');
    table.string('cca2');
    table.string('flag');
    table.string('coat_of_arms');
    table.integer('population');
    table.double('gdp');
    table.double('area');
    table.string('region');
    table.string('map');
    table.string('subregion');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('unfiltered_countries');
};
