import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { GameContext } from "../App";

import SelectionCard from "./SelectionCard";
import Selected from "./Selected";

export default function Selection() {
  const { countries } = useContext(GameContext);

  const navigate = useNavigate();

  const [randEntries, setRandEntries] = useState([]);
  const [currentSelection, setCurrentSelection] = useState(null);

  useEffect(() => {
    if (!countries || countries.length === 0) return;

    let num1, num2, num3;

    do {
      num1 = Math.floor(Math.random() * countries.length);
      num2 = Math.floor(Math.random() * countries.length);
      num3 = Math.floor(Math.random() * countries.length);
    } while (num1 === num2 || num1 === num3 || num2 === num3);

    const entries = [
      countries[num1],
      countries[num2],
      countries[num3]
    ];

    setRandEntries(entries);
  }, [countries]);

  function backHome(){
    setCurrentSelection(null)
    navigate('/')
  }

  // this return happens AFTER all hooks, conditional...
  if (!countries || countries.length === 0) {
    return <h2>Loading...</h2>;
  }
  // console.log(currentSelection)
  return (
    <div className="selection">
      <button onClick={() => backHome()}>🏠︎Home</button>
      <h2>Choose Your Country</h2>

      <div className="selection-area">
        {randEntries.map((country, index) => (
          <SelectionCard key={index} countryData={country} setSelection={setCurrentSelection} />
        ))}
      </div>

      {currentSelection && (
        <Selected country={currentSelection}/>
      )}
    </div>
  );
}
