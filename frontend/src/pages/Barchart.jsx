import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
} from "chart.js";
import { useNavigate } from "react-router-dom";

Chart.register(CategoryScale, LinearScale, BarController, BarElement);

export default function BarChart() {
  const navigate = useNavigate();
  const [priceRangesData, setPriceRangesData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(10);  

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/charts/barChart?month=${selectedMonth}`
      );
      setPriceRangesData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const data = {
    labels: priceRangesData.map((range) => range.range),
    datasets: [
      {
        label: "Number of Items",
        data: priceRangesData.map((range) => range.count),
        backgroundColor: "#fba0e3",
        borderColor: "#f400a1",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
        offset: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-purple-100"
      style={{
        padding: "20px",
      }}
    >
      <div
        className="w-full max-w-md p-6 bg-pink-50"
        style={{
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          className="text-4xl font-bold mb-4 text-center"
          style={{
            color: "#333",
            marginBottom: "20px",
          }}
        >
          BAR CHART STATS
        </h2>
        <div className="flex justify-center mb-4">
        <label htmlFor="month" className="mr-2">
          Select Month:
        </label>
        <select
          className="mb-4 p-2 border border-gray-400 md"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}>
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
        <div className="w-full h-64">
          <Bar data={data} options={options} />
        </div>
      </div>
      <button
          className="m-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
          onClick={() => navigate("/")}
        >
          Go back
        </button>
    </div>
  );
}
