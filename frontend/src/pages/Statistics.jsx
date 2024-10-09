import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Statistics() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(10); 
  const [statistics, setStatistics] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStatistics();
  }, [selectedMonth]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/data/statistics?month=${selectedMonth}`
      );
      setStatistics(response.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch statistics. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-purple-100">
      {statistics && (
        <div className="flex flex-col items-start space-y-2 bg-pink-50 p-5 rounded-lg shadow-md">
          <h2 className="text-4xl font-bold mb-4">STATISTICS</h2>
            <div>
            <label htmlFor="month" className="mr-2">
                Select Month:
            </label>
            <select
              className="mb-4 p-2 border border-gray-400"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            >
              <option value={1}>January</option>
              <option value={2}>February</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>August</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>November</option>
              <option value={12}>December</option>
            </select>
          </div>
          <div className="font-bold text-md">Total Sale:</div>
          <div className="text-gray-700">${statistics.totalSaleAmount}</div>

          <div className="font-bold text-md">Total Sold Item/s:</div>
          <div className="text-gray-700">{statistics.totalSoldItems}</div>

          <div className="font-bold text-md">Total Not Sold Item/s:</div>
          <div className="text-gray-700">{statistics.totalNotSoldItems}</div>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      <button
        className="m-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
        onClick={() => navigate("/")}
      >
        Go back
      </button>
    </div>
  );
}
