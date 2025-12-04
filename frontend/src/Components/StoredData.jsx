import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./StoredDataStyles.css";

function StoredData() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://192.168.1.195:8000/api/submissions/";

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setSubmissions(res.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching submissions:", err);
      setError("Failed to load submissions. Make sure the backend is running.");
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
      try {
        await axios.delete(`${API_URL}${id}/`);
        setSubmissions(submissions.filter((sub) => sub.id !== id));
        alert("Submission deleted successfully!");
      } catch (err) {
        console.error("Error deleting submission:", err);
        alert("Failed to delete submission");
      }
    }
  };

  const handleDeleteAll = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete ALL submissions? This cannot be undone."
      )
    ) {
      try {
        await axios.delete(API_URL);
        setSubmissions([]);
        alert("All submissions deleted successfully!");
      } catch (err) {
        console.error("Error deleting all submissions:", err);
        alert("Failed to delete all submissions");
      }
    }
  };

  return (
    <div className="stored-data-container">
      <div className="stored-data-header">
        <h2>Stored Submissions</h2>
        <Link to="/"> Back to Form</Link>
      </div>

      {loading && <p className="loading">Loading submissions...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && submissions.length === 0 && !error && (
        <p className="no-data">No submissions found.</p>
      )}

      {!loading && submissions.length > 0 && (
        <>
          <div className="submissions-list">
            {submissions.map((sub) => (
              <div key={sub.id} className="submission-card">
                <div className="submission-content">
                  <p>
                    <strong>Name:</strong> {sub.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {sub.email}
                  </p>
                  {sub.created_at && (
                    <p>
                      <strong>Submitted:</strong>{" "}
                      {new Date(sub.created_at).toLocaleString()}
                    </p>
                  )}
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(sub.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div className="actions">
            <button className="delete-all-btn" onClick={handleDeleteAll}>
              Delete All Submissions
            </button>
            <button className="refresh-btn" onClick={fetchSubmissions}>
              Refresh
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default StoredData;
