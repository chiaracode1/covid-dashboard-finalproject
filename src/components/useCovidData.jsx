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

                const globalData = data.map((report) => ({
                    country: report.region.name,
                    confirmed: report.confirmed,
                    deaths: report.deaths,
                    recovered: report.recovered,
                    date: report.date
                }));

                const totalConfirmed = globalData.reduce((acc, countryData) => acc + countryData.confirmed, 0);
                const totalDeaths = globalData.reduce((acc, countryData) => acc + countryData.deaths, 0);
                const totalRecovered = globalData.reduce((acc, countryData) => acc + countryData.recovered, 0);

                setStats({
                    confirmed: totalConfirmed,
                    deaths: totalDeaths,
                    recovered: totalRecovered
                });

                // GRAPHIC CHART

                setChartData({
                    labels: globalData.map((countryData) => countryData.country),
                    datasets: [
                        {
                            label: "Confirmed",
                            data: globalData.map((countryData) => countryData.confirmed),
                            backgroundColor: "rgba(75, 192, 192, 0.6)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                        },
                        {
                            label: "Deaths",
                            data: globalData.map((countryData) => countryData.deaths),
                            backgroundColor: "rgba(255, 99, 132, 0.6)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 1,
                        },
                        {
                            label: "Recovered",
                            data: globalData.map((countryData) => countryData.recovered),
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
