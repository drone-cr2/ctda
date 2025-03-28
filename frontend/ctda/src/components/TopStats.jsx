import React, { useState, useEffect } from "react";
import { Link, Image, MessageSquare, Text } from "lucide-react";

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
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-[#364C63] border-b-2 "></div>
          </div>
      );
  }

  if (!stats) {
      return <div className="text-[#364C63] text-center">No data available</div>;
  }

  return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {/* No. of Words */}
              <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                  <Text className="text-indigo-600 text-5xl mb-3" />
                  <h1 className="text-3xl font-bold text-indigo-600">{stats?.num_words || "0"}</h1>
                  <p className="text-sm text-gray-600">Words</p>
              </div>

              {/* No. of Messages */}
              <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                  <MessageSquare className="text-indigo-600 text-5xl mb-3" />
                  <h1 className="text-3xl font-bold text-indigo-600">{stats?.num_messages || "0"}</h1>
                  <p className="text-sm text-gray-600">Messages</p>
              </div>

              {/* No. of Links */}
              <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                  <Link className="text-indigo-600 text-5xl mb-3" />
                  <h1 className="text-3xl font-bold text-indigo-600">{stats?.num_links || "0"}</h1>
                  <p className="text-sm text-gray-600">Links</p>
              </div>

              {/* No. of Media */}
              <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                  <Image className="text-indigo-600 text-5xl mb-3" />
                  <h1 className="text-3xl font-bold text-indigo-600">{stats?.num_media_messages || "0"}</h1>
                  <p className="text-sm text-gray-600">Media</p>
              </div>
          </div>
      </div>
  );
};


export default TopStats;
