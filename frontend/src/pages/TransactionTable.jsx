import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TransactionTable() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState("10"); 
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, [page, month]); 

  const fetchTransactions = async () => {
    setLoading(true);
    setError(""); 
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/data/transactions?page=${page}&perPage=${perPage}&month=${month}`
      );
      console.log(response.data); 
      if (Array.isArray(response.data)) {
        setTransactions(response.data);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error(error);
      setTransactions([]);
      setError("Failed to fetch transactions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-purple-100">
      <h1 className="text-4xl mb-4">TRANSACTION TABLE</h1>
      <div className="w-3/4">
        <div className="flex justify-center items-center mb-4">
        <label htmlFor="month" className="mr-2">
          Select Month:
        </label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border border-gray-500 px-4 py-2 w-50"
          >
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        {loading && <p>Loading transactions...</p>}
        {error && <div className="text-red-500">{error}</div>}
        <div className="overflow-y-auto max-h-80">
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-pink-200">
                <th className="border border-gray-700 py-2 px-4">Title</th>
                <th className="border border-gray-700 py-2 px-4">Description</th>
                <th className="border border-gray-700 py-2 px-4">Category</th>
                <th className="border border-gray-700 py-2 px-4">Price</th>
                <th className="border border-gray-700 py-2 px-4">Sold</th>
                <th className="border border-gray-700 py-2 px-4">Date of Sale</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction._id} className="bg-pink-50">
                    <td className="border border-gray-700 py-2 px-4">{transaction.title}</td>
                    <td className="border border-gray-700 py-2 px-4">{transaction.description}</td>
                    <td className="border border-gray-700 py-2 px-4">{transaction.category}</td>
                    <td className="border border-gray-700 py-2 px-4">${transaction.price}</td>
                    <td className="border border-gray-700 py-2 px-4">{transaction.sold ? "Yes" : "No"}</td>
                    <td className="border border-gray-700 py-2 px-4">
                      {transaction.transaction_date ? new Date(transaction.transaction_date).toLocaleDateString() : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="border border-gray-700 py-2 px-4 text-center">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center mb-4">
          <button
            className="m-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
            onClick={() => navigate("/")}
          >
            Go back
          </button>
          <div>
            <button
              onClick={() => setPage((prevPage) => prevPage - 1)}
              disabled={page === 1}
              className="bg-pink-500 hover:bg-pink-700 text-white py-2 px-4 rounded mr-2"
              aria-label="Go to previous page"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((prevPage) => prevPage + 1)}
              disabled={transactions.length < perPage}
              className="bg-pink-500 hover:bg-pink-700 text-white py-2 px-4 rounded"
              aria-label="Go to next page"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
