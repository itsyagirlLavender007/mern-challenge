import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-purple-100">
      <div className="flex flex-wrap justify-center">
        <button
          className="m-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
          onClick={() => {
            navigate("/table");
          }}
        >
          TRANSACTION TABLE
        </button>
        <button
          className="m-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
          onClick={() => {
            navigate("/stats");
          }}
        >
          STATISTICS
        </button>
        <button
          className="m-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
          onClick={() => {
            navigate("/bar");
          }}
        >
          BAR CHART
        </button>
        <button
          className="m-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
          onClick={() => {
            navigate("/pie");
          }}
        >
          PIE CHART
        </button>
        <button
          className="m-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
          onClick={() => {
            navigate("alldata");
          }}
        >
          COMBINED DATA
        </button>
      </div>
    </div>
  );
}
