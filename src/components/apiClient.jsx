import axios from "axios";

const fetchCovidData = async () => {
  try {
    const response = await axios.get("https://covid-api.com/api/reports");
    const data = response.data.data;

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
    const countryData = countries.map((country) => ({
      country,
      ...aggregatedData[country],
    }));

    const totalConfirmed = countryData.reduce(
      (acc, countryData) => acc + countryData.confirmed,
      0
    );
    const totalDeaths = countryData.reduce(
      (acc, countryData) => acc + countryData.deaths,
      0
    );
    const totalRecovered = countryData.reduce(
      (acc, countryData) => acc + countryData.recovered,
      0
    );

    const stats = {
      confirmed: totalConfirmed,
      deaths: totalDeaths,
      recovered: totalRecovered,
    };

    return { countryData, stats };
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export { fetchCovidData };
