  export default function getDifficulty(areaKm2) {
    if (areaKm2 > 2_000_000) return "Very Easy";// Russia, Canada, USA, China very nice...
    if (areaKm2 > 500_000) return "Easy";
    if (areaKm2 > 100_000) return "Medium!";
    if (areaKm2 > 30_000) return "Hard!!";
    return "Very Hard!!!";
  }