const fs = require('fs');

async function fetchCountries() {
  // fetch the rest countries api
  const restCountries = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,capital,region,coatOfArms,population,area,flags,maps,gini"
  ).then(res => res.json());
  // filter out countries with missing gini, flags, and coat of arms...
  const filteredCountries = restCountries
    .filter(country => country.gini && Object.keys(country.gini).length > 0 &&
      (country.flags?.svg || country.flags?.png) &&
      (country.coatOfArms?.svg || country.coatOfArms?.png)
    )
    .map(country => ({
      name: country.name?.common,
      official: country.name?.official || null,
      capital: country.capital?.[0] || null,
      cca2: country.cca2,
      flag: country.flags?.svg || country.flags?.png,
      coatOfArms: country.coatOfArms?.svg || country.coatOfArms?.png,
      population: country.population,
      gini: country.gini[Object.keys(country.gini)[0]], // extract Gini value only
      gdp: null, // placeholder
      area: country.area,
      region: country.region,
      map: country.maps?.googleMaps || null
    }));

  //pull data from the world bank, its a beast with a ton of redundency
  const gdpData = await fetch(
    "https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD?format=json&per_page=20000"
  ).then(res => res.json());

  // this is required bec the data is litereally split into two for some reason...
  const gdpEntries = gdpData[1];

  // gdp entries have multiple entries of gdp per year per country
  // gotta find the first one for each country and skip.
  // we also need to make sure that the damn countries match in this horrible loop. O(n^2)
  for (const entry of gdpEntries) {
    const match = filteredCountries.find(country => country.cca2 === entry.country.id);
    if(!match) continue; //basically for countries filtered out from before.
    if(match.gdp !== null) continue; // skip if already found basically
    match.gdp = entry.value;
  }

  // to avoid promises and stuff we will do knex here now.
  console.log('filtered Data is created and json file is created.');
  const countryString = JSON.stringify(filteredCountries);
  fs.writeFile("backup.json", countryString, err => {
    if (err) console.error(err);
  });


  return filteredCountries;
}

fetchCountries();

module.exports = fetchCountries;