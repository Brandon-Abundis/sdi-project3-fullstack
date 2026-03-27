
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import GeoChart from "../GeoCharts/GeoChart"
import { GameContext } from "../App"
import Back from "../Start/Back"
import Score from "../HelperFunctions/score"

export default function EndOverlay() {
  const {countryStats, allied, captured, rounds} = useContext(GameContext)
  const navigate = useNavigate();

  function showMessage(){
    if(rounds >= 67) {
      return <h2>Hit max rounds of {rounds}</h2>
    } else {
      return <h2>Your Country Collapsed! GINI hit 60 points</h2>
    }
  }

  //fastest way to do these calculations
  const totalCaputuredPopulation = captured.reduce(
    (sum, country) => sum + (country.population || 0 ),
    0
  )
  const totalCapturedArea = captured.reduce(
    (sum, country) => sum + (country.area),
    0
  )

  return(
    <div className="end-overlay">
      <div className="end-menu">
        <div className="end-tab">
          <Back/>
          {/* <h2>Your Country Collapsed! GINI hit 60 points</h2> */}
          {showMessage()}

        </div>

        <div className="end-top">
          <div className="stats">
            <div className="stats-left">
              <h3>{countryStats.official}</h3>
              <img src={countryStats.flag} alt={countryStats.name}></img>
            </div>

            <div className="stats-right">
              <span>GDP: ${countryStats.gdp.toLocaleString()}</span>
              <span>Population: {Math.round(countryStats.population).toLocaleString()}</span>
              <span>Captured: {captured.length} countries</span>
              <span>Allied: {allied.length} countries</span> {/* error here */}
              <span>Region: {countryStats.region}</span>
              <div className="stats-inner-right">
                <span>Score: {Score(countryStats)}</span>
                <span>Total global population: {(Math.round(totalCaputuredPopulation) + Math.round(countryStats.population)).toLocaleString()} </span>
                <span>Total captured global area: {(totalCapturedArea + countryStats.area).toLocaleString()} km²</span>

              </div>
            </div>
          </div>
        </div>
        <GeoChart />
      </div>
    </div>
  )
}