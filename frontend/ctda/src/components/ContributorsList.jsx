import React, { useState, useEffect } from "react";

const ContributorsList = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("http://127.0.0.1:8080/contributions")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const names = Object.values(data.percent);
        const contributions = Object.values(data.count);

        const contributorsList = names.map((name, index) => ({
          name,
          contribution: contributions[index],
          rank: index + 1, // Assign rank based on sorted order
        }));

        const sortedContributors = contributorsList.sort(
          (a, b) => b.contribution - a.contribution
        );

        setContributors(sortedContributors.slice(0, 10)); // Show top 10
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to fetch data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center text-red-500">
        Error: Not Enough Data for Display
      </div>
    );
  }

  return (
    <div className="w-full p-4 border border-gray-300 shadow-md bg-white">
      <h2 className="text-xl font-semibold text-indigo-600 text-center mb-4">
        Top Contributors
      </h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-2">
        {contributors.map((contributor, index) => (
          <div
            key={index}
            className="min-w-[200px] bg-gray-100 flex flex-col items-center rounded-lg shadow-md p-3 relative"
          >
            {/* Rank Badge */}
            <div className="absolute -top-2 -left-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              #{index + 1}
            </div>

            {/* Contribution Percentage */}
            <div className="w-16 h-16 bg-indigo-600 text-white font-bold text-md flex items-center justify-center rounded-full">
              {contributor.contribution}%
            </div>

            {/* Contributor Name */}
            <p className="mt-2 text-xs text-indigo-700 text-center">
              {contributor.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContributorsList;
