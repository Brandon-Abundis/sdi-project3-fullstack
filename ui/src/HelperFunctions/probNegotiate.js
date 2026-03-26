import Score from "./score";

export default function computeNegotiationProbability(userStats, botStats) {
  const userScore = Score(userStats);
  const botScore = Score(botStats);
  const userGini = userStats.gini[Object.keys(userStats.gini)[0]];
  const botGini = botStats.gini[Object.keys(botStats.gini)[0]];

  //score leverage, even with low gini if your strong countries still want to be friend
  const scoreRatio = userScore / botScore;
  let leverage = 0;

  // more score better leverage, weak is a penalty
  if (scoreRatio > 1) {
    leverage = Math.min(0.25, (scoreRatio - 1) * 0.20);
  } else {
    leverage = Math.max(-0.25, (scoreRatio - 1) * 0.20);
  }

  //gini stability, countries don't want to deal with poor and unstable
  const giniDiff = botGini - userGini; //positive - more stable
  const giniBonus = giniDiff * 0.003; //small buff bec math sucks at 0

  //energy factor
  let energyBonus = 0;
  if (userStats.energy < 0.05) {
    energyBonus = -0.50; // %50 penalty
  } else {
    energyBonus = (userStats.energy - 0.5) * 0.4; //small scaling
  }

  // GDP peer respect bonus, bec it is crazy
  const gdpRatio = Math.min(userStats.gpd, botStats.gpd) / Math.max(userStats.gpd, botStats.gpd);
  let gdpBonus = 0;

  if (gdpRatio > 0.9) gdpBonus = 0.20;
  else if (gdpRatio > 0.75) gdpBonus = 0.12;
  else if (gdpRatio > 0.6) gdpBonus = 0.06;

  // Base chance 55% baseline chance
  let finalProb = 0.55 + leverage + giniBonus + energyBonus + gdpBonus;

  //clamp to avoid any math issues
  finalProb = Math.max(0.01, Math.min(0.95, finalProb));

  // This is where gambling is fun!
  const didSucceed = Math.random() < finalProb;

  return {
    probability: finalProb,
    result: didSucceed ? "win" : "fail",
  };
}
