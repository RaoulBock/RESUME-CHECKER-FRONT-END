import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [resume, setResume] = useState("");
  const [role, setRole] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobSearch, setJobSearch] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!resume.trim()) newErrors.resume = "Resume is required.";
    if (!role.trim()) newErrors.role = "Target role is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setFeedback("");

    try {
      const res = await axios.post(
        "https://resume-checker-backend-ixbn.onrender.com/analyze",
        {
          resume,
          role,
        }
      );

      setFeedback(res.data.feedback);
    } catch (err) {
      console.error(err);
      setFeedback("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>🧠 AI Resume Checker</h1>

      <textarea
        placeholder="Past your resume here ..."
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        rows={10}
      />
      {errors.resume && <p className="error">{errors.resume}</p>}

      <input
        type="text"
        placeholder="Target role (e.g., Frontend Developer)"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      {errors.role && <p className="error">{errors.role}</p>}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {/* <button className="search-btn" onClick={() => setIsModalOpen(true)}>
        Search for job
      </button> */}

      {feedback && (
        <div className="feedback">
          <h2>Feedback</h2>
          <pre>{feedback}</pre>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div>
              <h2>Search for your next job.</h2>
              <input
                type="text"
                className="search-input"
                placeholder="Search jobs..."
                value={jobSearch}
                onChange={(e) => setJobSearch(e.target.value)}
              />
            </div>
            <button className="exit-btn" onClick={() => setIsModalOpen(false)}>
              Exit
            </button>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>
          Made with ❤ by{" "}
          <a
            href="https://github.com/raoulbock"
            target="_blank"
            rel="noopener noreferrer"
          >
            @raoulbock
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
