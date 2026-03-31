import { useEffect, useState, useContext } from "react";
import GeoSelectChart from "../GeoCharts/GeoSelectChart";
import { GameContext } from "../App";

import getDifficulty from "../HelperFunctions/getDifficulty";
import Back from "../Start/Back";
// import useFetchUnfiltered from "../customHooks/useFetchUnfiltered";
//https://media1.tenor.com/m/1EwNf1_27Q0AAAAC/seiun-sky-sieun-fish.gif
export default function GuessGame() {
  const { countries, unfiltered } = useContext(GameContext);

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

  const [showEnd, setShowEnd] = useState(false);
  const [message, setMessage] = useState(
    {
      msg: '',
      source: null,
      msgCSS: {}
    });

  const gifobj ={
    win: ['https://media1.tenor.com/m/fYchCFlG2HAAAAAd/satono-diamond.gif', 'https://media1.tenor.com/m/D4ga-MHBWZYAAAAC/gog-alien.gif', 'https://media.tenor.com/HZxmXhOu9xkAAAAi/fish-spinning-spinning-fish.gif', 'https://media1.tenor.com/m/-JmRuFyBvQsAAAAd/caballo.gif'],
    lose: ['https://media1.tenor.com/m/Ftt2wpxYZaoAAAAC/umamusume-seiun-sky.gif','https://media1.tenor.com/m/o0rZGsm3gWAAAAAC/skeleton-meme.gif', 'https://media1.tenor.com/m/ekA1xxoJoSoAAAAC/angryxdx.gif', 'https://media1.tenor.com/m/F-D5EhlQXdMAAAAC/nalog.gif', 'https://media1.tenor.com/m/hH8vLaUMljIAAAAC/strawberry-cat-domgcat-donkeycat-free-robux-vbucks.gif', 'https://media.tenor.com/damu8hbJ19YAAAAi/shrug-emoji.gif']
  }
  function randGif(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  //random
  function randomCountry(list) {
    if (!list.length) return null;
    const randID = Math.floor(Math.random() * list.length);
    return list[randID];
  }

  //initialize remainingCountries when countries load
  useEffect(() => {
    if (unfiltered?.length) {
      const filtered = unfiltered.filter(c => c.area >= 10800).filter(c => c.cca2 !== "AQ");
      setRemainingCountries(filtered);
      setRandCountry(randomCountry(unfiltered));
    }
  }, [unfiltered]);

  //new random country whenever round changes
  useEffect(() => {
    if (remainingCountries.length > 0) {
      setRandCountry(randomCountry(remainingCountries));
      console.log("Remaining countries:", remainingCountries.length);
    } else {
      setShowEnd(true);
    }
  }, [round]);

  useEffect(() => {
    console.log(selectedCCA2, randCountry?.cca2)
    if (selectedCCA2 === randCountry?.cca2) {
      setMessage({msg: 'CORRECT',
          source: randGif(gifobj.win),
          msgCSS: { color: "lime", fontWeight: 650, fontSize: "1.4rem" }});

      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));

      //remove the guessed country from the pool
      setRemainingCountries(prev =>
        prev.filter(country => country.cca2 !== randCountry.cca2)
      );
      //add to visually show on the geograph
      setGuessedCountries(prev => [...prev, randCountry])

      // checking for null so to not cross contaminate logic.
    } else if(selectedCCA2 != null) {
      // console.log(`WRONG: ${selectedCCA2} is not ${randCountry?.cca2}`);
      setMessage({msg:`WRONG, that is not '${randCountry?.name}'!`,
        source: randGif(gifobj.lose),
        msgCSS: { color: "red", fontWeight: 650, fontSize: "1.4rem" }});

      setScore(prev => ({ ...prev, wrong: prev.wrong + 1 }));
    }
    setSelectedCCA2(null); // just incase of an error i saw once.
    //next round if win or lose
    setRound(prev => prev + 1);
  }, [selectedCCA2])


  return (
    <div className="GuessGame">
      <div className="guess-country-info">

        {randCountry && <div className="guess-left">
          <Back/>
          <p>Find <span style={{fontWeight: '650', color: 'white' }}>
            {randCountry.name}</span> on the map. Difficulty:
              {getDifficulty(randCountry.area)}</p>
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
          <div style={message.msgCSS}>{message.msg}
            <img src={message.source} alt="img" style={{ maxWidth: "fit-content", height: "100px", marginLeft: "8px" }}/>
          </div>
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
