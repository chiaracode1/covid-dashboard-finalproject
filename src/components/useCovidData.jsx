import React, { useState, useEffect } from "react";
import { fetchCovidData } from "./apiClient";

const useCovidData = () => {
  const [chartData, setChartData] = useState({});
  const [stats, setStats] = useState({});
  const [searchCountry, setSearchCountry] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { countryData, stats } = await fetchCovidData();

        setStats(stats);

        const filteredCountryData = countryData.filter((country) =>
          country.country.toLowerCase().includes(searchCountry.toLowerCase())
        );

        setChartData({
          labels: filteredCountryData.map((country) => country.country),
          datasets: [
            {
              label: "Confirmed",
              data: filteredCountryData.map((country) => country.confirmed),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Deaths",
              data: filteredCountryData.map((country) => country.deaths),
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "Recovered",
              data: filteredCountryData.map((country) => country.recovered),
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [searchCountry]);

  return { chartData, stats, setSearchCountry };
};

export default useCovidData;
