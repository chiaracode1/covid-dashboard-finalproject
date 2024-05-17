import React from "react";
import useUSData from "./useUSData"; 

const USData = () => {
    const { usData, error } = useUSData();

    if (error) return <p>Error loading US data: {error.message}</p>;
    if (!usData.length) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">COVID-19 Data for United States</h1>
            <div className="grid grid-cols-3 gap-4">
                {usData.map((stateData) => (
                    <div key={stateData.region.province} className="bg-gray-200 p-4 rounded-lg">
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

