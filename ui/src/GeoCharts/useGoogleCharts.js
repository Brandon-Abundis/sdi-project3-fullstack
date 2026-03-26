// useGoogleCharts.js
import { useEffect, useState } from "react";

// this is needed so that both components stop fighting
// used google ai to help, as the documentation is like not amazing
// without this react catches on fire.
export default function useGoogleCharts() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window._googleChartsReady) {
      setReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.gstatic.com/charts/loader.js";
    script.async = true;

    script.onload = () => {
      window.google.charts.load("current", { packages: ["geochart"] });
      window.google.charts.setOnLoadCallback(() => {
        window._googleChartsReady = true;
        setReady(true);
      });
    };

    document.body.appendChild(script);
  }, []);

  return ready;
}
