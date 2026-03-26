import { useContext } from "react"

import { GameContext } from "../App"

import formatNumber from "../HelperFunctions/formatNumber"
import Score from "../HelperFunctions/score"
import getGiniStyle from "../HelperFunctions/getGiniStyle"
import getGiniBackgroundStyle from "../HelperFunctions/getGiniBackgroundStyle"

export default function UserCard({countryStats}) {
  const { captured, allied} = useContext(GameContext);

  // function getGiniWarningStyle(gini) {
  //   if (gini < 30) {
  //     return { color: "lightblue" };
  //   }
  //   if (gini < 40) {
  //     return { color: "green" };
  //   }
  //   if (gini < 50) {
  //     return { color: "yellow" };
  //   }
  //   return { color: "red" };
  // }


  return(
    <div className="user-card">

      <div className="user-main">
        <span>{countryStats.name.common}{" score: "}{Score(countryStats)}</span>

        <img src={countryStats.coatOfArms.svg} alt={countryStats.flags.alt} style={{ width: "100%", height: "auto", maxHeight: "300px", objectFit: "contain" }}></img>

        <h1 style={getGiniBackgroundStyle(countryStats.gini[Object.keys(countryStats.gini)[0]])}>
          Gini {Object.keys(countryStats.gini)[0]}:{" "}
          <span style={getGiniStyle(countryStats.gini[Object.keys(countryStats.gini)[0]])}>
            {countryStats.gini[Object.keys(countryStats.gini)[0]].toFixed(2)}</span>
        </h1>

        <span>GPD: ${formatNumber(countryStats.gdp)}</span>
        <span>Population: {formatNumber(countryStats.population)}</span>
        <span>Captured: {captured.length}</span>
        <span>Allied: {allied.length}</span>
      </div>

    </div>
  )
}