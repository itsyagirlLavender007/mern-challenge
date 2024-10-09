import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CombinedData() {
  const navigate = useNavigate();
  const [combinedData, setCombinedData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("10");

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/combinedData?month=${selectedMonth}`
      );
      setCombinedData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-purple-100">
      <div className="flex justify-center">
      <h2 className="text-4xl font-bold mb-4">COMBINED DATA</h2>
      </div>
      <div className="mb-4 flex justify-center">
        <label htmlFor="month" className="mr-2">
          Select Month:
        </label>
        <select
          id="month"
          className="px-4 py-2 border border-gray-400 md"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
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
      {combinedData && (
        <div>
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">Bar Chart Data</h3>
            <pre className="p-4 rounded-md border border-gray-400 bg-pink-50">
              {JSON.stringify(combinedData.barChartData, null, 2)}
            </pre>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">Pie Chart Data</h3>
            <pre className="bg-pink-50 border border-gray-400 p-4 rounded-md">
              {JSON.stringify(combinedData.pieChartData, null, 2)}
            </pre>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Statistics Data</h3>
            <pre className="bg-pink-50 border border-gray-400 p-4 rounded-md">
              {JSON.stringify(combinedData.statisticsData, null, 2)}
            </pre>
          </div>
        </div>
      )}
      <div className="flex justify-center">
      <button
        className="m-2 px-2 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
        onClick={() => navigate("/")}
      >
        Go Back
      </button>
      </div>
    </div>
  );
}
