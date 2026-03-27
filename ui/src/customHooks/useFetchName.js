import { useState, useEffect } from "react";

export default function useFetchCCA2(cca2) {
  const [country, setCountry] = useState([]);

  useEffect(()=>{
    async function fetchData() {
      const data = await fetch(`http://localhost:8080/countries/cca2/${cca2}`)
        .then(res => res.json());

      setCountry(data)
    }
    fetchData();
  },[])
  return {country, setCountry}

}