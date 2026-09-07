import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [liveMessage, setLiveMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket("wss://intelligent-customer-triage-system-production.up.railway.app/ws");

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLiveMessage(data.message);
    };

    socket.onerror = () => {
      console.log("WebSocket error");
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
    
  }, []); 

  const handlePredict = async () => {
    setLoading(true);
    setError("");
    setPrediction("");

    try {
    const response = await fetch("https://intelligent-customer-triage-system-production.up.railway.app/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: subject,
        text: text,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to get prrediction");
    }

    const data = await response.json();

    if (data.error) {
      setError(data.error);
      return;
    }

    setPrediction(data.prediction);
  } catch (error) {
    setError(error.message);
  } finally{
    setLoading(false);
  }
};
    
    return (
    
    <div className="app">
      <div className="container">

        <div className="header">
          <h1>Customer Support Triage System</h1>
          <p>
            Automatically classify customer support tickets using Machine Learning
          </p>
        </div>

        <div className="card">

          <div className="form-group">
            <label>Ticket Subject</label>

            <input
              type="text"
              placeholder="Enter ticket subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Ticket Description</label>

            <textarea
              placeholder="Enter your support ticket"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <button
            onClick={handlePredict}
            disabled={loading || (!subject.trim() && !text.trim())}
          >
            {loading ? "Predicting..." : "Predict Category"}
          </button>

          {error && (
            <div className="error">
              {error}
            </div>
          )}

          {prediction && (
            <div className="result">
              <h2>Prediction Result</h2>
              <p className="category">
                {prediction}
              </p>
            </div>
            )}
            {liveMessage && (
              <div className="result">
              <h2>⚡Live Activity</h2>
              <p>{liveMessage}</p>
            </div>
            )}

        </div>

        <div className="footer">
          AI-powered Customer Support Ticket Classification © 2026.
        </div>

      </div>
    </div>
  
  )};

  export default App;
