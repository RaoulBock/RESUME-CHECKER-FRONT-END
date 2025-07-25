import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [resume, setResume] = useState("");
  const [role, setRole] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!resume || !role) {
      alert("Please fill out both fields.");
      return;
    }

    setLoading(true);
    setFeedback("");

    try {
      const res = await axios.post("http://localhost:5000/analyze", {
        resume,
        role,
      });

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
      <input
        type="text"
        placeholder="Target role (e.g., Frontend Developer)"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {feedback && (
        <div className="feedback">
          <h2>Feedback</h2>
          <pre>{feedback}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
