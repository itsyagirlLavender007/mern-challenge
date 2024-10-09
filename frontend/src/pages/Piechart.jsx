import { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";

Chart.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(10); // Default to October

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/charts/pieChart?month=${selectedMonth}`
      );
      setCategoryData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const data = {
    labels: categoryData.map((category) => category.category),
    datasets: [
      {
        label: "Number of Items",
        data: categoryData.map((category) => category.count),
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
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
          PIE CHART STATS
        </h2>
        <div className="flex justify-center mb-4">
        <label htmlFor="month" className="mr-2">
          Select Month:
        </label>
          <select
            className="p-2 border border-gray-400"
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
        <div className="w-full h-77 flex justify-center items-center">
          <Pie data={data} />
        </div>
      </div>
      <button
        className="m-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
        onClick={() => navigate("/")}
      >
        Go Back
      </button>
    </div>
  );
}
