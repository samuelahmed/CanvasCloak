"use client";

import { useState } from "react";

export default function Completion() {
  const [result, setResult] = useState("");
  const [clientContent, setClientContent] = useState(
    "Input text to see full API response"
  );
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: clientContent }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Completion (gpt-3.5-turbo)</h1>
        <input
          type="text"
          value={clientContent}
          onChange={(e) => setClientContent(e.target.value)}
        />
        <button
          className={`font-bold py-2 px-4 rounded ${
            isLoading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
          } text-white`}
          onClick={fetchData}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Fetch Result"}
        </button>
      </div>
      <pre className="overflow-auto max-w-7xl">
        {JSON.stringify(result, null, 2)}
      </pre>
    </>
  );
}
