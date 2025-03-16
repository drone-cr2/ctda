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
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-[#364C63] border-b-2 border-[#364C63]"></div>
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
    <div className="bg-[#E0E0E0] text-[#364C63] p-8 rounded-lg shadow-lg w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Busiest Day */}
        <div className="p-6 bg-[#F4F3EF] rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-[#EAB308]/50 border border-[#364C63]/10">
          <FaCalendarDay className="text-[#EAB308] text-5xl mb-3" />
          <h3 className="text-lg font-semibold text-[#364C63]">Busiest Day</h3>
          <p className="text-3xl font-bold text-[#EAB308]">{stats.busiest_day}</p>
          <span className="text-[#364C63]/80">{stats.busiest_day_message_count} Messages</span>
        </div>

        {/* Busiest Week */}
        <div className="p-6 bg-[#F4F3EF] rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-[#60A5FA]/50 border border-[#364C63]/10">
          <FaCalendarWeek className="text-[#60A5FA] text-5xl mb-3" />
          <h3 className="text-lg font-semibold text-[#364C63]">Busiest Week</h3>
          <p className="text-3xl font-bold text-[#60A5FA]">{stats.busiest_week}</p>
          <span className="text-[#364C63]/80">{stats.busiest_week_message_count} Messages</span>
        </div>

        {/* Busiest Month */}
        <div className="p-6 bg-[#F4F3EF] rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-[#43A047]/50 border border-[#364C63]/10">
          <FaCalendarAlt className="text-[#43A047] text-5xl mb-3" />
          <h3 className="text-lg font-semibold text-[#364C63]">Busiest Month</h3>
          <p className="text-3xl font-bold text-[#43A047]">{stats.busiest_month}</p>
          <span className="text-[#364C63]/80">{stats.busiest_month_message_count} Messages</span>
        </div>
      </div>
    </div>
  );
};

export default TemporalStats;