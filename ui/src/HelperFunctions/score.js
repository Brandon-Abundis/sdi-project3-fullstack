// computeCountryScore
export default function Score(country) {
  // SAVE THIS JUST IN CASE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // function clamp01(x) {
  //   return Math.max(0, Math.min(1, x));
  // }
  // const gdp = country.gdp;
  // const population = country.population;
  // const gini = country.gini[Object.keys(country.gini)[0]];

  // const gdpPerCap = gdp / population;

  // // Wider, more realistic scaling
  // const gdpPerCapScore = Math.log(gdpPerCap) ** 1.3;
  // const gdpTotalScore = Math.log(gdp) ** 1.15;
  // const popScore = Math.log(population) ** 1.1;

  // // Gini penalty (simple)
  // const giniScore = (60 - gini);

  // const raw =
  //   0.35 * gdpPerCapScore +
  //   0.40 * gdpTotalScore +
  //   0.20 * popScore +
  //   0.05 * giniScore;

  // // Much larger scale
  // return Math.round(raw * 200);
  const gdp = country.gdp;
  const population = country.population;
  const gini = country.gini[Object.keys(country.gini)[0]];

  const gdpBillions = gdp / 1_000_000_000;
  const gdpPerCap = gdp / population;
  const popMillions = population / 1_000_000;

  const raw =
      0.50 * gdpBillions +// GDP
      0.30 * (gdpPerCap / 1000) +// GDP per capita
      0.15 * Math.sqrt(popMillions) + // sqrt population
      0.05 * (60 - gini);//inequality bonus

  return Math.round(raw * 100);
}