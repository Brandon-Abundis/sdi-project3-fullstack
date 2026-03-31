const fs = require('fs');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('unfiltered_countries').del()

  const raw = fs.readFileSync('backup_no_filter.json', 'utf-8');
  const unfiltered_countries = JSON.parse(raw);

  await knex('unfiltered_countries').insert(
    unfiltered_countries.map(country => ({
      name: country.name,
      official_name: country.official,
      capital: country.capital,
      cca2: country.cca2,
      flag: country.flag,
      coat_of_arms: country.coatOfArms,
      population: country.population,
      gdp: country.gdp,
      area: country.area,
      region: country.region,
      map: country.map,
      subregion: country.subregion
    }))
  );
  console.log(`${unfiltered_countries.length} entries were seeded to the 'unfiltered_countries' db`)
};
