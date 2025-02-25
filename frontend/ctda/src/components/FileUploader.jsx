import React, { useState } from "react";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([]); // Store users list
  const [selectedUser, setSelectedUser] = useState(""); // Selected user
  const [fileContent, setFileContent] = useState("");

  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
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
    setFileContent("")
    setFile(null);
    setUsers([]);
    setSelectedUser("");
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

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
    }
  };

  return (
    <div className="flex justify-center items-center h-[50%] w-[700px] bg-[#364C63] rounded-b-md">
      <div className="flex flex-col justify-center items-center text-white rounded-lg p-6 sm:p-8 md:p-10 w-full max-w-md sm:max-w-lg md:max-w-3xl">
        {!fileContent && (
          <>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-[#E0E0E0]">
              Upload Your Conversation
            </h2>
            <label className="inline-block cursor-pointer my-2 bg-[#F3B340] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#f39c40] transition duration-200 sm:w-[15%] mx-auto text-center">
              Upload
              <input
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </>
        )}

        <div className="mt-4 w-full">
          {fileContent && (
            <>
              <pre className="h-72 sm:h-80 md:h-84 max-h-80 bg-[#F4F3EF] text-[#364C63] p-4 rounded-md shadow-md overflow-y-auto text-left">
                {fileContent}
              </pre>

              {/* <button
                onClick={handleUpload}
                className="mt-4 bg-[#3B82F6] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#2563EB] transition duration-200 w-full"
              >
                Analyze
              </button> */}

              <button
                onClick={handleRemoveFile}
                className="mt-3 bg-[#F3B340] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#f39c40] transition duration-200 w-[30%]"
              >
                Remove
              </button>

              {/* {users.length > 0 && (
                <div className="mt-4 w-full">
                  <label className="block text-sm font-semibold">
                    Select a User:
                  </label>
                  <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
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
              )} */}

              {/* {selectedUser && (
                <p className="mt-2 text-xl text-green-400 font-thin">
                  Selected User: {selectedUser}
                </p>
              )} */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
