import { useState, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Start/Home";
import Selection from "./Start/Selection";
import Game from "./Game/Game";

import useFetchAll from "./customHooks/useFetchAll";
import "./App.css";

export const GameContext = createContext();

function App() {

  const [countryStats, setCountryStats] = useState(null);
  const [captured, setCaptured] = useState([]);
  const [allied, setAllied] = useState([]);
  const [rounds, setRounds] = useState(0);

  const { countries, setCountries } = useFetchAll();
  if(!countries) return <div>Loading Countries</div>

  const [dbData, setdbData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const countriesData = await fetch('http://localhost:8080/countries/all')
        .then(res => res.json());

      setdbData(countriesData);
    }
    fetchData();
  },[]);

  return (
    <GameContext.Provider
      value={{countryStats, setCountryStats,
              captured, setCaptured,
              allied, setAllied,
              rounds, setRounds,
              countries, setCountries, dbData}}>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/selection' element={<Selection/>} />
        <Route path='/game/:round' element={<Game/>} />
      </Routes>
    </GameContext.Provider>
  );
}

export default App;
