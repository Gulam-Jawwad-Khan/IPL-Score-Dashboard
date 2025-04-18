import { useState, useEffect } from "react";
import { getPointsTable } from "../services/api"; // Import the new function
import LoadingSpinner from "./ui/Loader";

export default function ScoreCard() {
  // You can rename it to ScoreCard if you want
  const [pointsTable, setPointsTable] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPointsTable = async () => {
      try {
        const data = await getPointsTable();
        setPointsTable(data);
      } catch (err) {
        setError("We are unable to load the data");
      } finally {
        setLoading(false);
      }
    };

    fetchPointsTable();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Points Table
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-sm font-semibold text-center text-gray-700">
                Team
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-center text-gray-700">
                P
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-center text-gray-700">
                W
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-center text-gray-700">
                L
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-center text-gray-700">
                Points
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-center text-gray-700">
                NRR
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {pointsTable.map((team, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-red-50 transition-colors`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={team.flag}
                      alt={team.team}
                      className="w-8 h-8 rounded-full object-contain"
                    />
                    <span className="text-gray-700 text-sm font-medium">
                      {team.team}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-gray-700">
                  {team.played}
                </td>
                <td className="px-4 py-3 text-center text-gray-700">
                  {team.won}
                </td>
                <td className="px-4 py-3 text-center text-gray-700">
                  {team.loss}
                </td>
                <td className="px-4 py-3 text-center text-gray-700">
                  {team.points}
                </td>
                <td className="px-4 py-3 text-center text-gray-700">
                  {team.nrr}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
