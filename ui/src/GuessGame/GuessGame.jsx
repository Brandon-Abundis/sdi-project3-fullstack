import { useEffect, useState, useContext } from "react";
import GeoSelectChart from "../GeoCharts/GeoSelectChart";
import { GameContext } from "../App";

export default function GuessGame() {
  const { countries } = useContext(GameContext);

  const [selectedCCA2, setSelectedCCA2] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);

  const [round, setRound] = useState(0);
  const [score, setScore] = useState({
    correct: 0,
    wrong: 0
  });

  const [randCountry, setRandCountry] = useState(null);

  const [remainingCountries, setRemainingCountries] = useState([]);
  const [guessedCountries, setGuessedCountries] = useState([]);

  //random
  function randomCountry(list) {
    if (!list.length) return null;
    const randID = Math.floor(Math.random() * list.length);
    return list[randID];
  }

  //initialize remainingCountries when countries load
  useEffect(() => {
    if (countries?.length) {
      const filtered = countries.filter(c => c.area >= 10670);
      setRemainingCountries(filtered);
      setRandCountry(randomCountry(countries));
    }
  }, [countries]);

  //new random country whenever round changes
  useEffect(() => {
    if (remainingCountries.length > 0) {
      setRandCountry(randomCountry(remainingCountries));
      console.log("Remaining countries:", remainingCountries.length);
    }
  }, [round]);

  useEffect(() => {
    console.log(selectedCCA2, randCountry?.cca2)
    if (selectedCCA2 === randCountry?.cca2) {
      console.log('match');

      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));

      //remove the guessed country from the pool
      setRemainingCountries(prev =>
        prev.filter(country => country.cca2 !== randCountry.cca2)
      );
      //add to visually show on the geograph
      setGuessedCountries(prev => [...prev, randCountry])

      // checking for null so to not cross contaminate logic.
    } else if(selectedCCA2 != null) {
      console.log(`WRONG: ${selectedCCA2} is not ${randCountry?.cca2}`);
      setScore(prev => ({ ...prev, wrong: prev.wrong + 1 }));
    }
    setSelectedCCA2(null); // just incase of an error i saw once.
    //next round if win or lose
    setRound(prev => prev + 1);
  }, [selectedCCA2])


  function getDifficulty(areaKm2) {
    if (areaKm2 > 2_000_000) return "Very Easy";      // Russia, Canada, USA, China
    if (areaKm2 > 500_000) return "Easy";             // Large countries
    if (areaKm2 > 100_000) return "Medium!";           // Mid-sized
    if (areaKm2 > 30_000) return "Hard!!";              // Smaller countries
    return "Very Hard!!!";                               // Microstates, islands
  }


  return (
    <div className="GuessGame">
      <div className="guess-country-info">

        {randCountry && <div className="guess-left">
          <p>Find <span style={{fontWeight: '650', color: 'white' }}>{randCountry.name}</span> on the map. Difficulty: {getDifficulty(randCountry.area)}</p>
          <div className="guess-inner">
            <img src={randCountry.flag} alt={randCountry.name} style={{maxHeight:"80px"}}/>
            <div>
              <p>Region: {randCountry.region}</p>
              <p>Area: {randCountry.area.toLocaleString()} km²</p>
            </div>
          </div>
        </div>}

        <div className="guess-right">
          <p>Guessed Correctly: {score.correct}</p>
          <p>Guessed Wrong: {score.wrong}</p>
          <p>Round: {round}</p>
          <p>Remaining: {remainingCountries.length}</p>
        </div>

      </div>

      <div className="map" style={{
        width: "100vw",
        height: "100vh",
        position: "center"
      }}>
        <GeoSelectChart
          width="100%"
          height="100%"
          remainingCountries={remainingCountries}
          guessedCountries={guessedCountries}
          randCountry={randCountry}
          onSelect={(iso) => {
            console.log("Selected:", iso);
            // console.log('current rand: ', randCountry.name)
            setSelectedCCA2(iso);
          }}
          onHover={(iso) => setHoveredCountry(iso)}
        />
      </div>
    </div>
  );
}
