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
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-[#364C63] border-b-2 border-[#364C63]"></div>
      </div>
    );
  }

  if (!stats) {
    return <div className="text-[#364C63] text-center">No data available</div>;
  }

  return (
    <div className="bg-[#E0E0E0] text-[#364C63] p-8 rounded-lg shadow-md w-full">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {/* No. of Words */}
        <div className="flex flex-col items-center bg-[#F4F3EF] p-6 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 hover:shadow-[#EAB308]/50 border border-[#364C63]/10">
          <FaFont className="text-[#EAB308] text-5xl mb-3" />
          <h1 className="text-4xl font-bold text-[#EAB308]">{stats.num_words}</h1>
          <p className="text-[#EAB308] text-lg">Words</p>
        </div>

        {/* No. of Messages */}
        <div className="flex flex-col items-center bg-[#F4F3EF] p-6 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 hover:shadow-[#60A5FA]/50 border border-[#364C63]/10">
          <FaComment className="text-[#60A5FA] text-5xl mb-3" />
          <h1 className="text-4xl font-bold text-[#60A5FA]">{stats.num_messages}</h1>
          <p className="text-[#60A5FA] text-lg">Messages</p>
        </div>

        {/* No. of Links */}
        <div className="flex flex-col items-center bg-[#F4F3EF] p-6 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 hover:shadow-[#43A047]/50 border border-[#364C63]/10">
          <FaLink className="text-[#43A047] text-5xl mb-3" />
          <h1 className="text-4xl font-bold text-[#43A047]">{stats.num_links}</h1>
          <p className="text-[#43A047] text-lg">Links</p>
        </div>

        {/* No. of Media */}
        <div className="flex flex-col items-center bg-[#F4F3EF] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-[#EF5350]/50 border border-[#364C63]/10">
          <FaImage className="text-[#EF5350] text-5xl mb-3" />
          <h1 className="text-4xl font-bold text-[#EF5350]">{stats.num_media_messages}</h1>
          <p className="text-[#EF5350] text-lg">Media</p>
        </div>
      </div>
    </div>
  );
};

export default TopStats;