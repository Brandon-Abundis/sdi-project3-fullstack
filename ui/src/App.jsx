import { useState, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Start/Home";
import Selection from "./Start/Selection";
import Game from "./Game/Game";

import useFetchAll from "./customHooks/useFetchAll";
import new_useFetchAll from "./customHooks/new_useFetchAll";
import "./App.css";

export const GameContext = createContext();

function App() {

  const [countryStats, setCountryStats] = useState(null);
  const [captured, setCaptured] = useState([]);
  const [allied, setAllied] = useState([]);
  const [rounds, setRounds] = useState(0);

  // const { countries, setCountries } = useFetchAll();
  const { countries, setCountries } = new_useFetchAll();
  if(!countries) return <div>Loading Countries</div>

  return (
    <GameContext.Provider
      value={{countryStats, setCountryStats,
              captured, setCaptured,
              allied, setAllied,
              rounds, setRounds,
              countries, setCountries}}>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/selection' element={<Selection/>} />
        <Route path='/game/:round' element={<Game/>} />
      </Routes>
    </GameContext.Provider>
  );
}

export default App;
