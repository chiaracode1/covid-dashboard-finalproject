// eslint-disable-next-line no-unused-vars
import React from "react";
import { useQuery } from "@tanstack/react-query"; 
import { fetchUSData } from "./useUSData"; 
import { Helmet } from "react-helmet";

const USData = () => {
    const { data: usData = [], error } = useQuery("usData", fetchUSData);

    if (error) {
        console.error("Error loading US data:", error);
        return null;
    }
    if (!usData.length) {
        return null;
    }

    return (
        <div className="p-2">
            <Helmet>
            <h1>COVID-19 Data for United States</h1>
            </Helmet>
            <div className="grid grid-cols-3 gap-2">
                {usData.map((stateData) => (
                    <div key={stateData.region.province} className="bg-gray-200 p-4 rounded">
                        <h2 className="text-xl font-semibold">{stateData.region.province}</h2>
                        <p>Confirmed: {stateData.confirmed}</p>
                        <p>Deaths: {stateData.deaths}</p>
                        <p>Recovered: {stateData.recovered}</p>
                        <p>Active: {stateData.active}</p>
                        <p>Date: {stateData.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default USData;
