import React, { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([]); // Store users list
  const [selectedUser, setSelectedUser] = useState(""); // Selected user

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle file upload using fetch API
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
      setUsers(data.users); // Store received users in state
      console.log(typeof(data));
      console.log(data);
      
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="p-10 border rounded-lg shadow-lg max-w-md mx-auto bg-black">
      {/* <h2 className="text-lg font-semibold mb-3">Upload a Text File</h2> */}
      {/* <label htmlFor="uploader">Choose file to upload</label> */}
      <input className="p-2 border hover:bg-gray-500 bg-gray-700 rounded-3xl " id="uploader" type="file" accept=".txt" onChange={handleFileChange}  />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Upload
      </button>

      {users.length > 0 && (
        <div className="mt-4">
          <label className="block text-sm font-semibold">Select a User:</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="border p-2 rounded w-full mt-1"
          >
            <option value="">-- Choose a user --</option>
            {users.map((user, index) => (
              <option key={index} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
      )}

     {/* Display selected user */}
            {selectedUser && (
        <p className="mt-2 text-green-600">Selected User: {selectedUser}</p>
      )}
    </div>
  );
};

export default FileUpload;
