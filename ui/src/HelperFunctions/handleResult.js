export default function handleResult(actualResult, type, setCountryStats, userStats, winChance, botStats, setRoundStats) {

  const attackRolls = {
    win: {
      energy: [-0.2, -0.3],
      giniRate: [5, 7], // attacking increases Gini (bad)
      populationGain: userStats.population * .1, // 10% gain
      gdpGain: userStats.gdp * .05, // 5% gain
    },
    loss: { // high penalty for losing
      energy: [-0.35, -0.45],
      giniRate: [2.5, 3.5],
      populationLoss: [userStats.population * .05, userStats.population * .067],
      gdpLoss: [userStats.gdp * .08, userStats.gdp * .10],
    }
  }

  const negotiateRolls = {
    win: {
      energy: [-0.1, -0.15],
      giniRate: [-3.75, -5.5],
      populationGain: botStats.population * .03, // 3% gain
      gdpGain: botStats.gdp * .03, // 3% allied contribution
    },
    loss: {
      energy: [-0.2, -0.3],
      giniRate: [0.5, 0.7],
      populationLoss: [userStats.population * .0003, userStats.population * .0005],
      gdpLoss: [userStats.gdp * .01, userStats.gdp * .02],
    }
  };

  const prevPopulation = userStats.population;
  const prevGDP = userStats.gdp;

  // checking what kind of roll was made
  const typeOfRoll = type === 'attack' ? attackRolls : negotiateRolls;

  // Risk multiplier based on probability
  const loseChance = 1 - (winChance ?? 0.5); // <-- prevents NaN if winChance missing
  const riskMultiplier = 1 + loseChance; // 1.0–2.0 range

  //________________________________random___________________________________________
  // rolls begin to be calculated
  // base rate of 70%
  const normal = Math.random() < 0.7;

  // Base rolls Energy
  let winEnergy  = normal ? typeOfRoll.win.energy[0]  : typeOfRoll.win.energy[1];
  let loseEnergy = normal ? typeOfRoll.loss.energy[0] : typeOfRoll.loss.energy[1];

  // Base rolls Gini
  let winGini  = normal ? typeOfRoll.win.giniRate[0]  : typeOfRoll.win.giniRate[1];
  let loseGini = normal ? typeOfRoll.loss.giniRate[0] : typeOfRoll.loss.giniRate[1];

  // Apply risk scaling
  winEnergy  *= riskMultiplier;
  loseEnergy *= riskMultiplier;
  winGini    *= riskMultiplier;
  loseGini   *= riskMultiplier;

  const energyDelta = actualResult === 'win' ? winEnergy : loseEnergy;
  const giniDelta   = actualResult === 'win' ? winGini  : loseGini;

  let adjustedDelta = energyDelta;
    // If energy is full, ignore negative deltas
  if (userStats.energy >= 1 && energyDelta < 0) {
    adjustedDelta = 0;
  }

  const newEnergy = Math.max(0, Math.min(1, userStats.energy + energyDelta));
  const newVolatility = 1 - newEnergy;
  //________________________________________________________________________________

  //___________________________garenteed_if_won_____________________________________
  let winPopulation = userStats.population + typeOfRoll.win.populationGain;
  let winGDP        = userStats.gdp        + typeOfRoll.win.gdpGain;

  let lossPopulationRate = normal ? typeOfRoll.loss.populationLoss[0] : typeOfRoll.loss.populationLoss[1];
  let lossGDPRate        = normal ? typeOfRoll.loss.gdpLoss[0]        : typeOfRoll.loss.gdpLoss[1];

  let lossPopulation = userStats.population - lossPopulationRate;

  let scaledLossGDP = lossGDPRate * riskMultiplier;
  let lossGDP = userStats.gdp - scaledLossGDP;

  // winPopulation  *= riskMultiplier;
  // lossPopulation *= riskMultiplier;
  winGDP         *= riskMultiplier;
  // lossGDP        *= riskMultiplier;

  const newPopulation = actualResult === 'win' ? winPopulation : lossPopulation;
  const newGDP        = actualResult === 'win' ? winGDP        : lossGDP;

  const populationDelta = newPopulation - prevPopulation;
  const gdpDelta = newGDP - prevGDP;

  setRoundStats({
    result: actualResult,
    prevPopulation,
    newPopulation,
    populationDelta,
    prevGDP,
    newGDP,
    gdpDelta
  });


  // this was orinally due to a key having an object of random key names
  // if i remove this for gini it breaks sooooooo, i just changes it a lil.
  setCountryStats(prev => {
    // Get the prevoius key value
    const currentGini = prev.gini;

    const newGini = Math.max(20, Math.min(60, currentGini + giniDelta));

    return {
      ...prev,
      gdp: newGDP,
      gini: newGini,// is now just a number...
      energy: newEnergy,
      population: newPopulation,
      volatility: newVolatility
    };
  });

}
