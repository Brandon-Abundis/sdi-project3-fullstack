import { useEffect, useRef, useContext } from "react";
import useGoogleCharts from "./useGoogleCharts";


// Required google ai to assist use its own thing,
// google docs are trash and help for react on this is TRASH!!!!
import { GameContext } from "../App";
/* requires
  [
  ['Country', 'Value', {role: 'tooltip'}]
  ['US', 100, country.area]
  ]
*/
const GeoChart = ({refreshKey, width, height, testData}) => {
  const {countryStats, allied, captured, countries} = useContext(GameContext);

  const geoData = [
    ["Country", "Value", { type: "string", role: "tooltip" }],
  ];

  if (countryStats) { // setting up the chart with all of the data
    // user country
    geoData.push([
      countryStats.cca2,
      100,
      `Population: ${countryStats.population.toLocaleString()}
      GDP: $${countryStats.gdp.toLocaleString()}
      Area: ${countryStats.area.toLocaleString()} km²`
    ]);

    // allied countries
    allied.forEach(alliedCountry => {
      geoData.push([
        alliedCountry.cca2,
        150,
        `Allied - Population: ${alliedCountry.population.toLocaleString()}
        GDP: $${alliedCountry.gdp.toLocaleString()}
        Area: ${alliedCountry.area.toLocaleString()} km²`
      ]);
    });

    // captured countries
    captured.forEach(capturedCountry => {
      geoData.push([
        capturedCountry.cca2,
        200,
        `Captured - Population: ${capturedCountry.population.toLocaleString()}
        GDP: $${capturedCountry.gdp.toLocaleString()}
        Area: ${capturedCountry.area.toLocaleString()} km²`
      ]);
    });

  } else { // used for main menu
    // no selected country → show all
    testData.forEach(country => {
      geoData.push([
        country.cca2,
        50,
        `Population: ${country.population.toLocaleString()}
        GDP: $${country.gdp.toLocaleString()}
        Area: ${country.area.toLocaleString()} km²`
      ]);
    });
  }


  // reference to the DOM node where Google will draw the map.
  //  google Charts draws directly into a real DOM element, so useRef is ideal.
  const chartRef = useRef(null);

  //shared loader hook — ensures Google Charts is loaded ONCE globally.
  //both GeoChart and GeoRegion wait for this before drawing.
  const ready = useGoogleCharts();

  useEffect(() => {
    //If Google Charts isn't ready yet, do nothing.
    //This prevents the "Missing height argument" race condition.
    if (!ready) return;
    if (!chartRef.current) return;

    //convert your array-of-arrays into a Google DataTable.
    const data = window.google.visualization.arrayToDataTable(geoData);

    //chart styling + behavior configuration.
    const options = {
      resolution: "countries",// prevents province-level zoom issues
      backgroundColor: "#16171D",// map background
      datalessRegionColor: "#9f9e9e",// color for countries not in your dataset
      legend: "none",// hide legend
      colorAxis: {
        values: [50, 100, 150, 200],             // numeric scale
        colors: ["#447149", "#b70d0d", "#297ede", "#105702"], // gradient colors
      },
    };

    // create the chart instance and draw it into the <div>.
    const chart = new window.google.visualization.GeoChart(chartRef.current);
    chart.draw(data, options);

  }, [ready, refreshKey, JSON.stringify(geoData)]); //forcing a referesh as much as possible
  // re-draw whenever:
  // - Google Charts becomes ready
  // - Your data changes

  // The container MUST have a height or Google throws "Missing height argument".
  return (
    <div
      style={{ // needed to scale main menu to be bigger.
        width: width || "100%",
        height: height || "500px",
      }}
    >
      <div
        id="my-geo-chart"
        ref={chartRef}
        style={{ // i literally don't remeber why this is here, but it breaks it
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );

};

export default GeoChart;
