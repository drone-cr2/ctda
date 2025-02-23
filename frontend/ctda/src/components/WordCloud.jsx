import React, { useState, useEffect } from "react";

const WordCloud = () => {
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8080/wordcloud")
            .then((res) => res.json())
            .then((data) => setImageData(data.wordcloud_image));
    }, []);

    return (
        <div>
            <h2>🌥️ Word Cloud</h2>
            {imageData && <img src={`data:image/png;base64,${imageData}`} alt="Word Cloud" />}
        </div>
    );
};

export default WordCloud;