import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const TopStats = () => {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/top-stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching top stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if(!stats){
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="flex justify-evenly w-full">
      <div>
        <h1 className="text-5xl">{stats.num_words}</h1>
        <h1 className="text-2xl">No. of Words</h1>
      </div>
      <div>
        <h1 className="text-5xl">{stats.num_messages}</h1>
        <h1 className="text-2xl">No. of Messages</h1>
      </div>
      <div>
        <h1 className="text-5xl">{stats.num_links}</h1>
        <h1 className="text-2xl">No. of Links</h1>
      </div>
      <div>
        <h1 className="text-5xl">{stats.num_media_messages}</h1>
        <h1 className="text-2xl">No. of Media</h1>
      </div>
    </div>
  );
};

export default TopStats;
