import React, { useState, useEffect } from "react";

const WordCloud = () => {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("http://127.0.0.1:8080/wordcloud")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setImageData(data.wordcloud_image);
      })
      .catch((err) => {
        console.error("Error fetching word cloud:", err);
        setError(err.message || "Failed to fetch word cloud.");
      })
      .finally(() => {
        setLoading(false);
      });
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
    <div className="flex justify-center">
      {imageData ? (
        <div className="bg-white px-2 py-1">
          <img
            src={`data:image/png;base64,${imageData}`}
            alt="Word Cloud"
            className="my-2 max-w-full h-auto"
            style={{ maxHeight: "600px", aspectRatio: "4/3" }}
          />
        </div>
      ) : (
        <div className="my-2 items-center text-center">No word cloud available.</div>
      )}
    </div>
  );
};

export default WordCloud;