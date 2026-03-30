import { useEffect, useRef, useContext } from "react";
import useGoogleCharts from "./useGoogleCharts";

import { GameContext } from "../App"

const GeoSelectChart = ({ width, height, onSelect, onHover, remainingCountries, guessedCountries, region }) => {
  const {countries} = useContext(GameContext);
  const ready = useGoogleCharts();
  const chartRef = useRef(null);

  // Build simple data table
  const geoData = [
    ["Country", "Value", { type: "string", role: "tooltip" }],
    ...remainingCountries.map(c => [c.cca2, 1, c.region]), // all starting countries
    ...guessedCountries.map(c => [c.cca2, 2, c.region])
  ];

  useEffect(() => {
    if (!ready || !chartRef.current) return;

    const data = window.google.visualization.arrayToDataTable(geoData);

    const options = {
      resolution: "countries",
      backgroundColor: "#16171D",
      datalessRegionColor: "#555",
      legend: "none",
      colorAxis: {
        values: [1,2],
        colors: ["#4a8b34", "#e24a4a"]
      }
    };

    const chart = new window.google.visualization.GeoChart(chartRef.current);

    // AI assitance used here bec idk how i would even figure this out...
    // CLICK HANDLER
    window.google.visualization.events.addListener(chart, "regionClick", (e) => {
      if (onSelect) {
        onSelect(e.region); // returns ISO code aka CCA3 equivalent.
      }
    });

    // HOVER HANDLER
    window.google.visualization.events.addListener(chart, "regionMouseOver", (e) => {
      onHover?.(e.region);
    });

    window.google.visualization.events.addListener(chart, "regionMouseOut", () => {
      onHover?.(null);
    });

    chart.draw(data, options);
  }, [ready, JSON.stringify(geoData)]);

  return (
    <div style={{ width: width || "1200px", height: height || "800px" }}>
      <div
        ref={chartRef}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default GeoSelectChart;
