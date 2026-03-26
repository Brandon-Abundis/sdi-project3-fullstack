const fs = require('fs');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('countries').del()

  const raw = fs.readFileSync('backup.json', 'utf-8');
  const countries = JSON.parse(raw);

  await knex('countries').insert(
    countries.map(country => ({
      name: country.name,
      official_name: country.official,
      capital: country.capital,
      cca2: country.cca2,
      flag: country.flag,
      coat_of_arms: country.coatOfArms,
      population: country.population,
      gini: country.gini,
      gdp: country.gdp,
      area: country.area,
      region: country.region,
      map: country.map
    }))
  );
  console.log(`${countries.length} entries were seeded to the 'countries' db`)
};
