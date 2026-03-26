import { useState, useEffect } from "react";

export default function useFetchAll() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
      // check localStorage first, if data already fetched return
    const cached = localStorage.getItem("countryData");
    if(cached){
      setCountries(JSON.parse(cached));
      return
    }

    // async function to use await
    async function load(){

      // fetch REST countries, very simple holy, fields is a faster fetch
      const restCountries = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,cca2,capital,region,coatOfArms,population,area,flags,maps,gini"
      ).then(response => response.json());

      // remove countries with missing gini data, which is needed for logic
      // also put a placeholder key for the next fetch to populate
      const filteredCountries = restCountries
        .filter(country => country.gini && Object.keys(country.gini).length > 0)
        .map(country => ({ ...country, gdp: null }));

      // fetch World Bank specifically gdp, 2000 pages to get the whole thing
      const gdpData = await fetch(
        "https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD?format=json&per_page=20000"
      ).then(response => response.json());

      // gdpData[0] is metadata from the fetch
      // normal for loop to make it easier to read from a forEach.
      // gdp entries have multiple entries of gdp per year per country
      const gdpEntries = gdpData[1];
      for (const entry of gdpEntries) {
        // basically when i find the first entry, i assign it and keep skipping
        //  till i get to the next country
        const match = filteredCountries.find(country => country.cca2 === entry.country.id);
        if (!match){ // actualy moving on from countries i filtered out
          continue; // skip
        }
        if (match.gdp !== null) {
          continue; // if this key is assigned, we need to skip agressivly
        }
        match.gdp = entry.value;
      }

      // insert that thang into local storage so we don't have to do this again
      localStorage.setItem("countryData", JSON.stringify(filteredCountries));
      setCountries(filteredCountries);

    }

    load(); // run the async function
  },[]); // dependency array will make it run once

  return {countries, setCountries} // parent can now use these

}