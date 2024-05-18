import { useState, useEffect } from "react";
import axios from "axios";

const useUSData = () => {
  const [usData, setUSData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://covid-api.com/api/reports?iso=USA");
        setUSData(response.data.data);
      } catch (error) {
        setError(error);
        console.error("Error fetching US data:", error);
      }
    };

    fetchData();
  }, []);

  return { usData, error };
};

export default useUSData;
