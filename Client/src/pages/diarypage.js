import React, { useState, useEffect } from "react";
import axios from "axios";

const DiaryForm = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/Diaries/${user._id}`
        );
        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching entries:", error.response);
      }
    };

    fetchEntries();
  }, [user._id]);

  const handleSubmit = async () => {
    try {
      {
        const response = await axios.post(
          "http://localhost:8080/api/v1/Diaries",
          {
            userid: user._id,
            title,
            date,
            description,
          }
        );
        console.log("Entry created:", response.data);
        setEntries((prevEntries) => [...prevEntries, response.data]);
      }

      setTitle("");
      setDate("");
      setDescription("");
      setSelectedEntry(null);
    } catch (error) {
      console.error("Error:", error.response);
    }
  };

  const handleDelete = async (entryId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/Diaries/${entryId}`);
      console.log("Entry deleted:", entryId);

      setEntries((prevEntries) =>
        prevEntries.filter((entry) => entry._id !== entryId)
      );

      setTitle("");
      setDate("");
      setDescription("");
      setSelectedEntry(null);
    } catch (error) {
      console.error("Error deleting entry:", error.response);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Diary App</h1>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Date:</label>
        <input
          type="Date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="button" className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>

      <h2>Diary Entries</h2>
      <ul className="list-group">
        {entries.map((entry) => (
          <li key={entry._id} className="list-group-item">
            <div>
              <strong>{entry.title}</strong> - {entry.date}
              <p>{entry.description}</p>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(entry._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiaryForm;
