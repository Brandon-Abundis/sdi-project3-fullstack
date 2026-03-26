import { useContext, useEffect, useState } from "react";

import { GameContext } from "../App";

import UserCard from "./UserCard";
import CountryCard from "./CountryCard";
import EnergyBar from "./EnergyBar";
import Overlay from "./Overlay";
import Back from "../Start/Back";
import EndOverlay from "./EndOverlay";

import randCountries from "../HelperFunctions/randCountries";

export default function Game() {
  const {countryStats, setCountryStats,
    captured, setCaptured,
    allied, setAllied,
    rounds, setRounds,
    countries, setCountries} = useContext(GameContext);

    const [entries, setEntries] = useState([]);
    const [result, setResult] = useState("none")
    const [roundStats, setRoundStats] = useState({});
    const [showOverlay, setShowOverlay] = useState(false);
    const [showEnd, setShowEnd] = useState(false);

    useEffect(() => {
      if(countries.length > 0) {
      setEntries(randCountries(countries))
    }
  }, [rounds, countries])
  // const entries = randCountries(countries);

  useEffect(() => {
    const giniValue = countryStats.gini[Object.keys(countryStats.gini)[0]];
    if (giniValue >= 60) {
      setShowEnd(true);
    }
    if (rounds >= 67) {
      setShowEnd(true);
    }
  }, [countryStats]);


  function handleConsolidate() {
    const isGood = Math.random() < 0.7; // making the game random asf
    const delta = isGood ? 0.5 : 0.15; // 70% chance to get a good amount
    const newEnergy = Math.min(1, countryStats.energy + delta)
    const newVolatility = 1 - newEnergy;

    setCountryStats({
      ...countryStats,
      energy: newEnergy,
      volatility: newVolatility,
    });
    setRounds(rounds + 1);// rest counts as a round imo
  }

  return(
    <div className="game">
      {showOverlay && (
        <Overlay roundStats={roundStats} onClose={() => setShowOverlay(false)} />
      )}
      {showEnd && (
        <EndOverlay onClose={() => setShowEnd(false)} />
      )}

      <Back/>


          <h2>Round: {rounds}</h2>
          <span>Result: {result} </span>
      <div className="game-inner">
        <div className="game-inner-left">

          <div className="captured-col">
            {captured.map((cap, index) => (
                <img src={cap.flags.svg}
                alt={cap.name.common}
                key={index} style={{width: "2rem", height: "auto", border:'1px solid rgba(247, 0, 0, 0.6)'}}
                title={cap.name.common}></img>
              ))}
          </div>

          <div className="game-user-bar">
            <EnergyBar countryStats={countryStats} />
            <button style={{width:'fit-content'}} onClick={() => handleConsolidate()}> Consolidate </button>

            <UserCard countryStats={countryStats}/>
          </div>

          <div className="allied-col">
            {allied.map((cap, index) => (
                <img src={cap.flags.svg}
                alt={cap.name.common}
                key={index}
                style={{width: "2rem", height: "auto", border:'1px solid rgba(0, 247, 54, 0.6)'}}
                title={cap.name.common}></img>
              ))}
          </div>


        </div>

        <div className="game-inner-right">
          {entries.map((country, index) => (
            <CountryCard
              key={index}
              country={country}
              setResult={setResult}
              setRoundStats={setRoundStats}
              nextRound={() => setRounds(r => r+1)}// will force referesh from dependency array
              setShowOverlay={setShowOverlay}
              hoverEnabled={!showOverlay && !showEnd}
              />
          ))}
        </div>
      </div>
    </div>
  )
}