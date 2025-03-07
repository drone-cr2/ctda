import React, { useState } from "react";

const FileUploader = () => {
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
    <div className="flex justify-center items-center w-full md:w-[700px] bg-black rounded-b-md p-4">
      <div className="flex flex-col justify-center items-center text-white rounded-lg p-6 w-full max-w-md sm:max-w-lg md:max-w-3xl">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-[#E0E0E0]">
          Upload Your Conversation
        </h2>

        {!fileContent && (
          <label className="inline-block cursor-pointer my-2 bg-white text-black px-5 py-2 rounded-lg shadow-md hover:bg-slate-500 transition duration-200 w-full sm:w-auto text-center">
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
            <div className="flex justify-center items-center h-60 sm:h-72 md:h-80 lg:h-84 max-h-80 bg-[#F4F3EF] text-black p-4 rounded-md shadow-md">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : (
            fileContent && (
              <>
                <pre className="h-60 sm:h-72 md:h-80 lg:h-84 max-h-80 bg-[#F4F3EF] text-black p-4 rounded-md shadow-md overflow-y-auto text-left">
                  {fileContent}
                </pre>

                <div className="flex flex-col sm:flex-row justify-center sm:justify-start mt-3">
                  <button
                    onClick={handleUpload}
                    disabled={loadingUsers}
                    className={`mt-2 sm:mt-0 px-5 py-2 rounded-lg shadow-md transition duration-200 w-full sm:w-auto sm:mr-2 ${
                      loadingUsers
                        ? "bg-gray-400 text-black cursor-not-allowed"
                        : "bg-white text-black hover:bg-slate-500"
                    }`}
                  >
                    {loadingUsers ? (
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black mr-2"></div>
                        Fetching Users...
                      </div>
                    ) : (
                      "Get Users"
                    )}
                  </button>

                  <button
                    onClick={handleRemoveFile}
                    className="mt-2 sm:mt-0 bg-white text-black px-5 py-2 rounded-lg shadow-md hover:bg-slate-500 transition duration-200 w-full sm:w-auto"
                  >
                    Remove
                  </button>
                </div>

                {loadingUsers ? (
                  <div className="mt-4 w-full flex justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
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
                        className="border p-2 rounded w-full mt-1 bg-black text-white"
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
                  <p className="mt-2 text-lg text-green-400 font-semibold">
                    {feedback}
                  </p>
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
