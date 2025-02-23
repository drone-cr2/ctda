import React, { useState, useEffect } from "react";

const WordCloud = () => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/wordcloud")
      .then((res) => res.json())
      .then((data) => setImageData(data.wordcloud_image));
  }, []);

  return (
    <>
    {imageData ? (
        <img
          src={`data:image/png;base64,${imageData}`}
          alt="Word Cloud"
          className="w-[700px] my-2"
        />
    ) : (
        <div className="h-[300px] my-2 items-center text-center">
            Loading...
        </div>
    )}
      
    </>
  );
};

export default WordCloud;
