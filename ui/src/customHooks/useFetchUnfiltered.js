import { useState, useEffect } from "react";

export default function new_useFetchAll() {
  const [unfiltered, setUnfiltered] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const allData = await fetch('http://localhost:8080/unfiltered/all')
        .then(res => res.json());

      setUnfiltered(allData);
    }
    fetchData();
  },[]);
  return {unfiltered, setUnfiltered}
}