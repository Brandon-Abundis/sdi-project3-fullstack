import { useEffect, useRef } from "react";
import useGoogleCharts from "./useGoogleCharts";

const GeoRegion = ({ currentCountry }) => {
  //Shared Google Charts loader — ensures script + package load only once.
  const ready = useGoogleCharts();

  // reference to the DOM node where this region map will be drawn.
  const currentRef = useRef(null);

  // build the data table for this specific country.
  //    Google Charts requires a header row.
  const thisCountry = [
    ["Country", "Value", { type: "string", role: "tooltip" }],
    [currentCountry.cca2, 100, `Area: ${currentCountry.area.toLocaleString()} km²`],
  ];

  useEffect(() => {
    // Wait until Google Charts is fully ready.
    if (!ready) return;
    if (!currentRef.current) return;

    // Convert your array-of-arrays into a DataTable.
    const data = window.google.visualization.arrayToDataTable(thisCountry);

    // options for zooming into a single country.
    const options = {
      region: currentCountry.cca2,// zoom into this country
      resolution: "countries",
      backgroundColor: "#1f1f1f",
      datalessRegionColor: "#3a3a3a",
      legend: "none",
      colorAxis: {
        values: [100],
        colors: ["#8fae3b"],
      },
    };

    //create and draw the chart.
    const chart = new window.google.visualization.GeoChart(currentRef.current);
    chart.draw(data, options);

  }, [ready, currentCountry]);
  // Re-draw when:
  //  Google Charts becomes ready
  //  The selected country changes

  // container MUST have a height or Google throws "Missing height argument".
  return (
    <div
      ref={currentRef}
      style={{
        width: "100%",
        height: "30vh",// responsive height, no its not lol
        minHeight: "320px"
      }}
    />

  );
};

export default GeoRegion;
