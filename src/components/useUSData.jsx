import { useEffect, useState } from "react";
import axios from "axios";

const useUSData = () => {
    const [usStats, setUSStats] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://covid-api.com/api/reports?iso=USA");
                const data = response.data.data;

                const totalConfirmed = data.reduce((acc, stateData) => acc + stateData.confirmed, 0);
                const totalDeaths = data.reduce((acc, stateData) => acc + stateData.deaths, 0);
                const totalRecovered = data.reduce((acc, stateData) => acc + stateData.recovered, 0);

                setUSStats({
                    confirmed: totalConfirmed,
                    deaths: totalDeaths,
                    recovered: totalRecovered
                });
            } catch (error) {
                console.error("Error fetching US data: ", error);
            }
        };

        fetchData();
    }, []);

    return { usStats };
};

export default useUSData;
