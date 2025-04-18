import axios from "axios";

const API_URL =
  "https://api.cricapi.com/v1/series_points?apikey=f5e5da5a-3d89-4d7a-bcaa-636d9d6c836a&id=d5a498c8-7596-4b93-8ab0-e0efc3345312";
const HEADERS = {
  "x-rapidapi-key": "f5e5da5a-3d89-4d7a-bcaa-636d9d6c836a",
  // "x-rapidapi-host": "cricket-live-line1.p.rapidapi.com",
};

// 🟠 Function to fetch Points Table
export const getPointsTable = async () => {
  const options = {
    method: "GET",
    url: "https://api.cricapi.com/v1/series_points",
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
