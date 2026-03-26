import GeoChart from "../GeoCharts/GeoChart"

export default function Overlay({roundStats, onClose}) {

  function formatDeltaGDP(value) {
    const actual = Math.abs(value)
    return value > 0 ? `▲ +$${actual.toLocaleString()}` : `▼ -$${actual.toLocaleString()}`;
  }
  function formatDeltaPop(value) {
    const rounded = Math.round(value);
    return rounded > 0 ? `▲ +${rounded.toLocaleString()}` : `▼ ${rounded.toLocaleString()}`;
  }

  function getDeltaStyle(value) {
    return {
      color: value >= 0 ? "limegreen" : "red",
      fontWeight: "bold"
    }
  }
  // this is the ugliest div chain ive made, but needs to be done
  return(
    <div className="overlay">
      <div className="overlay-menu">

        <div className="overlay-btn">
          <button className="close-btn" onClick={onClose}>Close</button>
            <span className="result">Result: {roundStats.result}</span>
        </div>

        <div className="overlay-inner">
          <div className="overlay-left">
            <GeoChart refreshKey={roundStats} />
          </div>

          <div className="overlay-right">

            <span style={getDeltaStyle(roundStats.gdpDelta)}>
              <span className="label">GDP Change:</span>
              <span className="value">{formatDeltaGDP(roundStats.gdpDelta)}</span>
            </span>

            <span style={getDeltaStyle(roundStats.populationDelta)}>
              <span className="label">Population Change:</span>
              <span className="value">{formatDeltaPop(roundStats.populationDelta)}</span>
            </span>

            <span>
              <span className="label">Original GDP:</span>
              <span className="value" style={{color: 'yellow'}}>${roundStats.prevGDP.toLocaleString()}</span>
            </span>

            <span>
              <span className="label">Original Population:</span>
              <span  className="value" style={{color: 'yellow'}}>{Math.round(roundStats.prevPopulation).toLocaleString()}
</span>
            </span>

            <span>
              <span className="label">New GDP:</span>
              <span className="value" style={getDeltaStyle(roundStats.gdpDelta)}>${roundStats.newGDP.toLocaleString()}</span>
            </span>


            <span>
              <span className="label">New Population:</span>
              <span className="value" style={getDeltaStyle(roundStats.populationDelta)}>{Math.round(roundStats.newPopulation).toLocaleString()}
</span>
            </span>


          </div>

        </div>

      </div>

    </div>
  )
}