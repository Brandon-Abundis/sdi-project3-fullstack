const db = require("../db/db");
const fetchCountries = require('./fetchData');

(async () => {
  const countries = await fetchCountries();

  await db("countries").del();
  await db("countries").insert(countries);

  console.log("Countries inserted!");
  process.exit(0);
})();