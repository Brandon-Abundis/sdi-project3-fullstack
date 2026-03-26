import { useContext } from 'react'

import score from '../HelperFunctions/score'
import handleResult from '../HelperFunctions/handleResult'
import computeFinalProbability from '../HelperFunctions/prob'
import computeNegotiationProbability from '../HelperFunctions/probNegotiate'

import { GameContext } from '../App'

export default function CountryCard({country, setResult, nextRound, setRoundStats, setShowOverlay, hoverEnabled}) { //setCountryStats
  const { countryStats, setCountryStats, setCaptured, setAllied, countries, setCountries } = useContext(GameContext);

  const successProbability = computeFinalProbability(countryStats, country);
  const negotiateProbability = computeNegotiationProbability(countryStats, country);


  function getRiskColor(percentage) {
    if (percentage <= 25) return "#4CAF50";
    if (percentage <= 50) return "#FFC107";
    if (percentage <= 75) return "#FF5722";
    return "#D32F2F";
  }

  const attackFailPercent = Math.round((1 - successProbability.probability) * 100);
  const negotiateFailPercent = Math.round((1 - negotiateProbability.probability) * 100);

  const riskColorAttack = getRiskColor(attackFailPercent);
  const riskColorNegotiate = getRiskColor(negotiateFailPercent)

  function handleClick(actualResult, type){
    let winChance = type === 'attack'
      ? successProbability.probability
      : negotiateProbability.probability;

    handleResult(actualResult, type, setCountryStats, countryStats, winChance, country, setRoundStats);
    setResult('');
    setResult(actualResult);
    // 1. Add to captured or allied
    if (type === 'attack' && actualResult === 'win') {
      setCaptured(prev => [...prev, country]);
    }

    if (type === 'negotiate' && actualResult === 'win') {
      setAllied(prev => [...prev, country]);
    }

    //Remove from the main countries list
    // const updated = countries.filter(c => c.cca3 !== country.cca3);
    // setCountries(prev =>
    //   prev.filter(c => c.cca3 !== country.cca3)
    // );
    // O(n) of finding
    setCountries(prev =>
      prev.filter(c => c.cca2 !== country.cca2)
    );

    console.log(countries.length)
    nextRound(); // triggers useEffect dependency array to referesh
    setShowOverlay(true)
  }

  const coat = country.coatOfArms?.svg;
  const flag = country.flag?.svg;
  const imageSrc = coat == '' ? flag : coat; //image src is getting annoying


  return(
    <div className={`country-card ${hoverEnabled ? "hoverable" : ""}`} style={{
      backgroundImage: `url(${country.flags.svg})`,
      backgroundSize: 'cover',
    }}>
      <div className="country-data">
        <span >{country.name.common}{"/ score: "}{score(country)}</span>
        <img
          src={imageSrc}
          alt={country.name.common + " coat of arms"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = flag; // fallback to flag if coat fails
          }}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "170px",
            objectFit: "contain",
          }}
        />

      </div>
      <div className="country-buttons">
        <button
        onClick={() => handleClick(successProbability.result, 'attack')}
          className='attack-btn'
          style={{backgroundColor: riskColorAttack}}
        >⚔️ {attackFailPercent}% fail</button>
        <button
        onClick={() => handleClick(negotiateProbability.result, 'negotiate')}
        className='negotiate-btn'
        style={{backgroundColor: riskColorNegotiate}}
        >🏛️ {negotiateFailPercent}% fail</button>
      </div>
    </div>
  )
}