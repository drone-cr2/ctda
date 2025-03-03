import React, { useState, useEffect } from "react";

const WordCloud = () => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/wordcloud")
      .then((res) => res.json())
      .then((data) => setImageData(data.wordcloud_image));
  }, []);

  return (
    <div className="flex justify-center">
      {imageData ? (
        <div className="bg-white px-2 py-1">
          <img
            src={`data:image/png;base64,${imageData}`}
            alt="Word Cloud"
            className="my-2 max-w-full h-auto" // Responsive image
            style={{ maxHeight: "600px", aspectRatio: "4/3" }} // Aspect ratio and max height
          />
        </div>
      ) : (
        <div className="my-2 items-center text-center">Loading...</div>
      )}
    </div>
  );
};

export default WordCloud;
