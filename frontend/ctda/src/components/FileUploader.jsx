import React, { useState } from "react";

const FileUploader = () => {
  const [fileContent, setFileContent] = useState("");
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleRemoveFile = () => {
    setFileContent("");
    setFileInputKey(Date.now());
    setOptions([]);
  };

  const handleAnalyze = async () => {
    if (!fileContent) {
      alert("Please upload a file first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: fileContent }),
      });

      if (!response.ok) {
        throw new Error("Failed to send data to server");
      }

      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1E1E2E]">
      <div className="shadow-xl flex flex-col justify-center items-center bg-[#2A2A3C] text-white rounded-lg p-6 sm:p-8 md:p-10 w-full max-w-md sm:max-w-lg md:max-w-3xl">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-[#E0E0E0]">
          Upload Your Conversation
        </h2>

        {/* Upload Button (Visible only when no file is uploaded) */}
        {!fileContent && (
          <label className="inline-block cursor-pointer my-2 bg-[#3B82F6] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#2563EB] transition duration-200 sm:w-[15%] mx-auto text-center">
            Upload
            <input
              key={fileInputKey}
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        )}

        <div className="mt-4 w-full">
          {fileContent && (
            <>
              {/* Display File Content */}
              <pre className="h-60 sm:h-72 md:h-80 max-h-80 bg-[#3C3C4E] text-[#E0E0E0] p-4 rounded-md shadow-md overflow-y-auto text-left">
                {fileContent}
              </pre>

              {/* Analyze Button (Only visible when file is uploaded) */}
              <button
                onClick={handleAnalyze}
                className="mt-4 bg-[#3B82F6] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#2563EB] transition duration-200 w-full"
              >
                Analyze
              </button>

              {/* Remove Button */}
              <button
                onClick={handleRemoveFile}
                className="mt-3 bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-200 w-full"
              >
                Remove
              </button>

              {/* Dropdown Selector */}
              {options.length > 0 && (
                <select
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="mt-4 p-2 border rounded-lg w-full bg-[#2A2A3C] text-white border-gray-500"
                >
                  <option value="">Select an option</option>
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
