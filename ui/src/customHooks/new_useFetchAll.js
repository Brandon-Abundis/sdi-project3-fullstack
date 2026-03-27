import { useState, useEffect } from "react";

export default function new_useFetchAll() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const allData = await fetch('http://localhost:8080/countries/all')
        .then(res => res.json());

      setCountries(allData);
    }
    fetchData();
  },[]);
  return {countries, setCountries}
}