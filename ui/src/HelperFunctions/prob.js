import Score from "./score";

export default function computeFinalProbability(userStats, botStats) {
  function getEnergyMultiplier(energy) {
    if (energy < 0.01) return 0.001;
    if (energy < 0.15) return 0.01; //.6
    if (energy < 0.30) return 0.40; //.8
    if (energy < 0.50) return .90; // 1
    if (energy < 0.75) return 1.35;
    if (energy < 0.90) return 1.55;
    return 1.70;
  }
  const userScore = Score(userStats);
  const botScore = Score(botStats);

  const multiplier = getEnergyMultiplier(userStats.energy);
  const boostedUserScore = userScore * multiplier;

  // exponent possibly balanced
  const alpha = 2.0;
  const userPower = Math.pow(boostedUserScore, alpha);
  const botPower = Math.pow(botScore, alpha);

  let baseProb = userPower / (userPower + botPower);

  // *bonus (only helps against similar-strength countries)
  // literally just to make the game easier bec prob was too low.
  const ratio = userScore / botScore;
  let peerBonus = 0;
  if (ratio > 0.7 && ratio < 1.3) {
    peerBonus = 0.08; // +8% success
  }

  // stability boost, incentive to grow energy to a responsible amount
  const stabilityBoost = 0.18 * userStats.energy;

  //volatility swing
  const swing = (Math.random() * 2 - 1) * userStats.volatility * 0.15;

  //used for displaying win chance, converted in game component to fail rate
  let finalProb = baseProb + peerBonus + stabilityBoost + swing;
  finalProb = Math.max(0, Math.min(1, finalProb))

  //determine actual win/lose result
  const roll = Math.random();
  const didWin = roll < finalProb; // if roll is less than win rate, false


  return {
    probability: finalProb,
    result: didWin ? "win" : "fail",
  }
}



