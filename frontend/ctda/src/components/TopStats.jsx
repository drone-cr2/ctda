import React, { useState, useEffect } from "react";
import { FaLink, FaImage, FaComment, FaFont } from "react-icons/fa";

const TopStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8080/top-stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching top stats:", error);
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

  if (!stats) {
    return <div className="text-white text-center">No data available</div>;
  }

  return (
    <div className="bg-black text-white p-8 rounded-lg shadow-md w-full">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {/* No. of Words */}
        <div className="flex flex-col items-center bg-gray-900 p-6 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 hover:shadow-yellow-400/50 ">
          <FaFont className="text-yellow-400 text-5xl mb-3" />
          <h1 className="text-4xl font-bold">{stats.num_words}</h1>
          <p className="text-gray-400 text-lg">Words</p>
        </div>

        {/* No. of Messages */}
        <div className="flex flex-col items-center bg-gray-900 p-6 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 hover:shadow-blue-400/50 ">
          <FaComment className="text-blue-400 text-5xl mb-3" />
          <h1 className="text-4xl font-bold">{stats.num_messages}</h1>
          <p className="text-gray-400 text-lg">Messages</p>
        </div>

        {/* No. of Links */}
        <div className="flex flex-col items-center bg-gray-900 p-6 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 hover:shadow-green-400/50 ">
          <FaLink className="text-green-400 text-5xl mb-3" />
          <h1 className="text-4xl font-bold">{stats.num_links}</h1>
          <p className="text-gray-400 text-lg">Links</p>
        </div>

        {/* No. of Media */}
        <div className="flex flex-col items-center bg-gray-900 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-red-400/50 ">
          <FaImage className="text-red-400 text-5xl mb-3" />
          <h1 className="text-4xl font-bold">{stats.num_media_messages}</h1>
          <p className="text-gray-400 text-lg">Media</p>
        </div>
      </div>
    </div>
  );
};

export default TopStats;
