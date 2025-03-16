import React, { useState } from "react";

const FileUploader = ({ onAnalyze }) => {
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [loadingFile, setLoadingFile] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
    const file = event.target.files[0];

    if (file) {
      setLoadingFile(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target.result);
        setLoadingFile(false);
      };
      reader.readAsText(file);
    }
  };

  const handleRemoveFile = () => {
    setFileContent("");
    setFile(null);
    setUsers([]);
    setSelectedUser("");
    setLoadingFile(false);
    setLoadingUsers(false);
    setFeedback(""); // Clear feedback
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setLoadingUsers(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8080/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleUserSelection = async (event) => {
    const selected = event.target.value;
    setSelectedUser(selected);
    setFeedback(""); // Clear previous feedback

    if (selected) {
      try {
        const response = await fetch("http://127.0.0.1:8080/set-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: selected }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to set user");
        }

        setFeedback(data.message); // Display feedback from API
      } catch (error) {
        console.error("Error setting user:", error);
        setFeedback("Failed to set user. Try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-full md:w-[700px] bg-[#F4F3EF] rounded-b-md p-4">
      <div className="flex flex-col justify-center items-center text-[#364C63] rounded-lg p-6 w-full max-w-md sm:max-w-lg md:max-w-3xl">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-[#364C63]">
          Upload Your Conversation
        </h2>

        {!fileContent && (
          <label className="inline-block cursor-pointer my-2 bg-[#364C63] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#2a3b4e] transition duration-200 w-full sm:w-auto text-center border border-[#364C63]/20">
            Upload
            <input
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        )}

        <div className="mt-4 w-full">
          {loadingFile ? (
            <div className="flex justify-center items-center h-60 sm:h-72 md:h-80 lg:h-84 max-h-80 bg-[#F4F3EF] text-[#364C63] p-4 rounded-md shadow-md">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#364C63]"></div>
            </div>
          ) : (
            fileContent && (
              <>
                <pre className="h-60 sm:h-72 md:h-80 lg:h-84 max-h-80 bg-white text-[#364C63] p-4 rounded-md shadow-md overflow-y-auto text-left border border-[#364C63]/10">
                  {fileContent}
                </pre>

                <div className="flex flex-col sm:flex-row justify-center sm:justify-start mt-3">
                  <button
                    onClick={handleUpload}
                    disabled={loadingUsers}
                    className={`mt-2 sm:mt-0 px-5 py-2 rounded-lg cursor-pointer shadow-md transition duration-200 w-full sm:w-auto sm:mr-2 ${
                      loadingUsers
                        ? "bg-gray-400 text-[#364C63] cursor-not-allowed"
                        : " bg-[#364C63] text-white hover:bg-[#2a3b4e] border border-[#364C63]/20"
                    }`}
                  >
                    {loadingUsers ? (
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#364C63] mr-2"></div>
                        Fetching Users...
                      </div>
                    ) : (
                      "Get Users"
                    )}
                  </button>

                  <button
                    onClick={handleRemoveFile}
                    className="mt-2 sm:mt-0 bg-[#364C63] cursor-pointer text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#2a3b4e] transition duration-200 w-full sm:w-auto border border-[#364C63]/20"
                  >
                    Remove
                  </button>
                </div>

                {loadingUsers ? (
                  <div className="mt-4 w-full flex justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#364C63]"></div>
                  </div>
                ) : (
                  users.length > 0 && (
                    <div className="mt-4 w-full">
                      <label className="block text-sm font-semibold">
                        Select a User:
                      </label>
                      <select
                        value={selectedUser}
                        onChange={handleUserSelection}
                        className="border p-2 rounded w-full mt-1 bg-white text-[#364C63] border-[#364C63]/20"
                      >
                        <option value="">-- Choose a user --</option>
                        {users.map((user, index) => (
                          <option key={index} value={user}>
                            {user}
                          </option>
                        ))}
                      </select>
                    </div>
                  )
                )}

                {feedback && (
                  <div className="">
                    <p className="mt-2 text-lg text-green-700">{feedback}</p>
                    <div className="rounded-md">
                      <button
                        onClick={onAnalyze}
                        className="mt-4 bg-[#364C63] cursor-pointer text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#2a3b4e] transition duration-200 w-full sm:w-auto border border-[#364C63]/20"
                      >
                        Analyze
                      </button>
                    </div>
                  </div>
                )}
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
