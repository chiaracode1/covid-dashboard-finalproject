import { useEffect, useState } from "react";
import axios from "axios";

const useCovidData = () => {
  const [chartData, setChartData] = useState({});
  const [stats, setStats] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://covid-api.com/api/reports");
        const data = response.data.data;

        // Total global cases
        const totalConfirmed = data.reduce((acc, report) => acc + report.confirmed, 0);
        const totalDeaths = data.reduce((acc, report) => acc + report.deaths, 0);
        const totalRecovered = data.reduce((acc, report) => acc + report.recovered, 0);

        setStats({
          confirmed: totalConfirmed,
          deaths: totalDeaths,
          recovered: totalRecovered
        });

        // GRAPHIC CHART
        const countries = data.map(report => report.region.name);
        const dates = [...new Set(data.map(report => report.date))];

        const datasets = [
          {
            label: "Confirmed",
            data: dates.map(date => {
              const reportForDate = data.filter(report => report.date === date);
              return reportForDate.reduce((acc, report) => acc + report.confirmed, 0);
            }),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1
          },
          {
            label: "Deaths",
            data: dates.map(date => {
              const reportForDate = data.filter(report => report.date === date);
              return reportForDate.reduce((acc, report) => acc + report.deaths, 0);
            }),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1
          },
          {
            label: "Recovered",
            data: dates.map(date => {
              const reportForDate = data.filter(report => report.date === date);
              return reportForDate.reduce((acc, report) => acc + report.recovered, 0);
            }),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1
          }
        ];

        setChartData({
          labels: dates,
          datasets: datasets
        });
      } catch (error) {
        setError(error);
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return { chartData, stats, error };
};

export default useCovidData;
