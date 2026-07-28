import React, { useState } from "react";
import Editor from "@monaco-editor/react";

function App() {

  const [code, setCode] = useState("print('Hello World')");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("python");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const runCode = async () => {

    setLoading(true);

    try {

      const response = await fetch("http://backend-container:8000/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          language: language,
          code: code
        })
      });

      const data = await response.json();

      const result = data.output || data.error;

      setOutput(result);

      setHistory(prev => [
        { code: code, result: result },
        ...prev
      ]);

    } catch (err) {

      setOutput("Server connection error");

    }

    setLoading(false);
  };

  const clearOutput = () => {
    setOutput("");
  };

  return (

    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      fontFamily: "Arial"
    }}>

      {/* Header */}

      <header style={{
        background: "#1e1e1e",
        color: "white",
        padding: "12px 20px",
        fontSize: "20px"
      }}>
        Online Code Runner
      </header>


      {/* Controls */}

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
        background: "#f0f0f0"
      }}>

        <label>Language:</label>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>

        <button
          onClick={runCode}
          style={{
            padding: "6px 15px",
            cursor: "pointer"
          }}
        >
          Run Code
        </button>

        <button
          onClick={clearOutput}
          style={{
            padding: "6px 15px",
            cursor: "pointer"
          }}
        >
          Clear Output
        </button>

      </div>


      {/* Editor */}

      <div style={{ flex: 1 }}>

        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value)}
          theme="vs-dark"
        />

      </div>


      {/* Output Panel */}

      <div style={{
        height: "150px",
        background: "#1e1e1e",
        color: "#00ff88",
        padding: "10px",
        fontFamily: "monospace",
        overflow: "auto"
      }}>

        <strong>Output:</strong>

        {loading ? (
          <p>Running code...</p>
        ) : (
          <pre>{output}</pre>
        )}

      </div>


      {/* Execution History */}

      <div style={{
        height: "200px",
        overflow: "auto",
        background: "#fafafa",
        padding: "10px"
      }}>

        <h3>Execution History</h3>

        {history.map((item, index) => (

          <div key={index} style={{
            borderBottom: "1px solid #ddd",
            marginBottom: "10px"
          }}>

            <strong>Code:</strong>

            <pre>{item.code}</pre>

            <strong>Output:</strong>

            <pre>{item.result}</pre>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;
