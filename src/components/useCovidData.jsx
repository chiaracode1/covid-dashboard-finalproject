import { useEffect, useState } from "react";
import axios from "axios";

const useCovidData = () => {
  const [chartData, setChartData] = useState({});
  const [stats, setStats] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://covid-api.com/api/reports/total");
        const data = response.data.data;

        const totalConfirmed = data.confirmed;
        const totalDeaths = data.deaths;
        const totalRecovered = data.recovered;

        setStats({
          confirmed: totalConfirmed,
          deaths: totalDeaths,
          recovered: totalRecovered
        });

        // GRAPHIC CHART
        
        setChartData({
          labels: ["Confirmed", "Deaths", "Recovered"],
          datasets: [
            {
              label: "Global Cases",
              data: [totalConfirmed, totalDeaths, totalRecovered],
              backgroundColor: [
                "rgba(75, 192, 192, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)"
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)"
              ],
              borderWidth: 1
            }
          ]
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
