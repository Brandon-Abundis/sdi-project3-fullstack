import { useNavigate } from "react-router-dom"

import GeoChart from "../GeoCharts/GeoChart";

export default function Home() {
  const navigate = useNavigate();

  function handleClick() {
    if(!window.google) return; // check if outside

    const data = window.google.visualization.arrayToDataTable(conqueredChartData);
    const chart = new window.google.visualization.GeoChart(chartRef.current);
    console.log()
  }

  return(
    <div className="home">
      <div className="geo-chart-menu">
        <GeoChart width={'900px'} height={'100%'}/>
      </div>
      <div className="home-menu">
        <h2>Global Conquest ahh game</h2>
        <button onClick={() => navigate('/selection')}>Start</button>
        <button>Stats</button>
        <button>World</button>
      </div>

      {/* -------------------------random stuff below------------------------ */}
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