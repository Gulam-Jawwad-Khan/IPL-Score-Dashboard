import axios from "axios";

const API_URL = "https://cricket-live-line1.p.rapidapi.com";
const HEADERS = {
  "x-rapidapi-key": "60af64af2bmsh2265032cba6c184p1e9ac3jsnca5a6bee2c22",
  "x-rapidapi-host": "cricket-live-line1.p.rapidapi.com",
};

// 🟠 Function to fetch Points Table
export const getPointsTable = async () => {
  const options = {
    method: "GET",
    url: "https://cricket-live-line1.p.rapidapi.com/series/336/pointsTable",
    headers: HEADERS,
  };

  try {
    const response = await axios.request(options);

    console.log("✅ Points table fetched:", response.data);

    const table = response.data?.data?.A;
    if (!response.data?.status || !Array.isArray(table)) {
      throw new Error("⚠️ Invalid points table format");
    }

    // 🟢 Transform data
    return table.map((team) => ({
      team: team.teams,
      played: team.P,
      won: team.W,
      loss: team.L,
      points: team.Pts,
      nrr: team.NRR,
      flag: team.flag,
    }));
  } catch (error) {
    console.error("❌ Error fetching points table:", error.message);
    throw new Error("Unable to fetch points table data.");
  }
};
