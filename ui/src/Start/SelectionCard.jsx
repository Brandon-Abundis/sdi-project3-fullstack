import formatNumber from '../HelperFunctions/formatNumber.js'
import Score from '../HelperFunctions/score.js';
import getGiniStyle from '../HelperFunctions/getGiniStyle.js';

import { useContext } from 'react';

import { GameContext } from '../App';

export default function SelectionCard({countryData, setSelection}){
  // const { setCountryStats } = useContext(GameContext);

  function handleSelection(selected){
    setSelection(selected)
  }

  return(
    <div className="selection-card" onClick={() => handleSelection(countryData)}>
      <span>{countryData.name.common}</span>

      <img src={countryData.flags.png} alt={countryData.flags.alt}></img>
      <span>GPD: ${formatNumber(countryData.gdp)}</span>
      <span>Population: {formatNumber(countryData.population)}</span>
      <span>
        Gini {Object.keys(countryData.gini)[0]}:{" "}
        <span style={getGiniStyle(countryData.gini[Object.keys(countryData.gini)[0]])}>
          {countryData.gini[Object.keys(countryData.gini)[0]]}</span>
      </span>
      <span>
        Starting Score: {Score(countryData)}
      </span>
    </div>
  )
}