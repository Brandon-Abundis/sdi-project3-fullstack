
export default function EnergyBar({countryStats}){
  return(
    <div className="energy-div">
      <div className="energy-bar">
        <div
          className="energy-fill"
          style={{
            width: `${countryStats.energy * 100}%`,// changing width lol
            backgroundColor:
              countryStats.energy > 0.75 ? "#4CAF50" :
              countryStats.energy > 0.5  ? "#FFC107" :
              countryStats.energy > 0.25 ? "#FF5722" :
                                          "#D32F2F",
          }}
        />
      </div>
      <span className="energy-label"> Stability: {Math.round(countryStats.energy * 100)} </span>
    </div>
  )
}