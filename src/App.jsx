import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import useCovidData from "./components/useCovidData";
import useUSData from "./components/useUSData";
import { Line } from "react-chartjs-2";
import Footer from "./components/Footer";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./App.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  const { chartData, stats, error: covidError } = useCovidData();
  const { usData, error: usError } = useUSData();

  return (
    <Router>
      <div>
        <Navbar title="COVID-19 Dashboard" />
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex flex-col items-center bg-gray-100 p-4">
                {covidError ? (
                  <div className="text-red-500">
                    Error loading COVID data: {covidError.message}
                  </div>
                ) : (
                  <>

                  {/* DATA CONTAINER */}

                    <div className="grid grid-cols-3 gap-4 w-full">
                      <div className="bg-green-500 flex flex-col items-center text-white sm:text-lg p-4">
                        <div className="mb-2">Confirmed</div>
                        <div className="bg-white text-green-500 p-1 rounded ">
                          {stats.confirmed}
                        </div>
                      </div>
                      <div className="bg-red-500 flex flex-col items-center text-white sm:text-lg p-4">
                        <div className="mb-2">Deaths</div>
                        <div className="bg-white text-red-500 p-1 rounded">
                          {stats.deaths}
                        </div>
                      </div>
                      <div className="bg-blue-500 flex flex-col items-center text-white sm:text-lg p-4">
                        <div className="mb-2">Recovered</div>
                        <div className="bg-white text-blue-500 p-1 rounded">
                          {stats.recovered}
                        </div>
                      </div>
                    </div>
                        <div className="w-full overflow-x-auto lg:min-h-screen"style={{ marginBottom: "4rem" }}>
                        <div className="min-w-[700px] flex-grow">
                        {chartData && chartData.datasets ? (
                          <Line data={chartData} />
                        ) : (
                          <p>Loading...</p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            }
          />

          {/* CONTAINER DATA USA */}

          <Route

            path="/us"
            element={
              usError ? (
                <p>Error loading US data: {usError.message}</p>
              ) : (
                <div className="p-4">
                  <h1 className="text-2xl font-bold mb-4">
                    COVID-19 Data for United States
                  </h1>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {Array.isArray(usData) && usData.length > 0 ? (
                      usData.map((stateData) => (
                        <div
                          key={stateData.region.province}
                          className="bg-gray-200 p-1 rounded-lg"
                        >
                          <h2 className="sm:text-1xl font-semibold align-center">
                            {stateData.region.province}
                          </h2>
                          <p>Confirmed: {stateData.confirmed}</p>
                          <p>Deaths: {stateData.deaths}</p>
                          <p>Recovered: {stateData.recovered}</p>
                          <p>Active: {stateData.active}</p>
                          <p>Date: {stateData.date}</p>
                        </div>
                      ))
                    ) : (
                      <p>No data available</p>
                    )}
                  </div>
                </div>
              )
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
