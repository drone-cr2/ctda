import React, { useState, useEffect } from "react";
import { FaCalendarDay, FaCalendarWeek, FaCalendarAlt } from "react-icons/fa";

const TemporalStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:8080/temporal-stats");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error("Error fetching temporal stats:", err);
      setError(err.message || "Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-40 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-black text-white p-8 rounded-lg shadow-lg w-full">

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Busiest Day */}
        <div className="p-6 bg-gray-900 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-yellow-400/50 ">
          <FaCalendarDay className="text-yellow-400 text-5xl mb-3" />
          <h3 className="text-lg font-semibold text-gray-300">Busiest Day</h3>
          <p className="text-3xl font-bold">{stats.busiest_day}</p>
          <span className="text-gray-400">{stats.busiest_day_message_count} Messages</span>
        </div>

        {/* Busiest Week */}
        <div className="p-6 bg-gray-900 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-blue-400/50">
          <FaCalendarWeek className="text-blue-400 text-5xl mb-3" />
          <h3 className="text-lg font-semibold text-gray-300">Busiest Week</h3>
          <p className="text-3xl font-bold">{stats.busiest_week}</p>
          <span className="text-gray-400">{stats.busiest_week_message_count} Messages</span>
        </div>

        {/* Busiest Month */}
        <div className="p-6 bg-gray-900 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-green-400/50">
          <FaCalendarAlt className="text-green-400 text-5xl mb-3" />
          <h3 className="text-lg font-semibold text-gray-300">Busiest Month</h3>
          <p className="text-3xl font-bold">{stats.busiest_month}</p>
          <span className="text-gray-400">{stats.busiest_month_message_count} Messages</span>
        </div>
      </div>
    </div>
  );
};

export default TemporalStats;
