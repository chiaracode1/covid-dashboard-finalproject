import { useEffect, useState } from "react";
import axios from "axios";

const useCovidData = () => {
    const [chartData, setChartData] = useState({});
    const [stats, setStats] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://covid-api.com/api/reports");
                const data = response.data.data;

                //  GLOBAL DATA

                const aggregatedData = data.reduce((acc, report) => {
                    const country = report.region.name;
                    if (!acc[country]) {
                        acc[country] = {
                            confirmed: 0,
                            deaths: 0,
                            recovered: 0,
                        };
                    }
                    acc[country].confirmed += report.confirmed;
                    acc[country].deaths += report.deaths;
                    acc[country].recovered += report.recovered;
                    return acc;
                }, {});

                const countries = Object.keys(aggregatedData);
                const countryData = countries.map(country => ({
                    country,
                    ...aggregatedData[country]
                }));

                const totalConfirmed = countryData.reduce((acc, countryData) => acc + countryData.confirmed, 0);
                const totalDeaths = countryData.reduce((acc, countryData) => acc + countryData.deaths, 0);
                const totalRecovered = countryData.reduce((acc, countryData) => acc + countryData.recovered, 0);

                setStats({
                    confirmed: totalConfirmed,
                    deaths: totalDeaths,
                    recovered: totalRecovered
                });

                // GRAPHIC CHART

                setChartData({
                    labels: countryData.map((country) => country.country),
                    datasets: [
                        {
                            label: "Confirmed",
                            data: countryData.map((country) => country.confirmed),
                            backgroundColor: "rgba(75, 192, 192, 0.6)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                        },
                        {
                            label: "Deaths",
                            data: countryData.map((country) => country.deaths),
                            backgroundColor: "rgba(255, 99, 132, 0.6)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 1,
                        },
                        {
                            label: "Recovered",
                            data: countryData.map((country) => country.recovered),
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
    }, []);

    return { chartData, stats };
};

export default useCovidData;
