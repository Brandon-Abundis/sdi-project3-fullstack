import { useNavigate } from "react-router-dom"

import GeoChart from "../GeoCharts/GeoChart";
import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const countriesData = await fetch('http://localhost:8080/countries/name/japan')
        .then(res => res.json());

      setData(countriesData);
    }
    fetchData();
  },[]);

  if(!data) return <p>Loading data...</p>
  console.log(data);

  return(
    <div className="home">
      <div className="geo-chart-menu">
        <GeoChart width={'900px'} height={'100%'} />
      </div>
      <div className="home-menu">
        <h2>Global Conquest ahh game</h2>
        <button onClick={() => navigate('/selection')}>Start</button>
        <button>Stats</button>
        <button>World</button>
      </div>

      <div>
        {data ? (<p>{data.region}</p>):(<p>Loading fetch data...</p>)}
      </div>


      <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
    </div>
  )
}