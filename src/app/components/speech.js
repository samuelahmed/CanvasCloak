"use client";

import { useState, useRef } from "react";

export default function Speech() {
  const audioRef = useRef();
  const [clientContent, setClientContent] = useState(
    "Input text to see full API response"
  );
  const [voice, setVoice] = useState("alloy");
  const [isLoading, setIsLoading] = useState(false);

  const voiceList = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"];

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: clientContent, voice: voice }),
      });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      audioRef.current.src = url;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Speech (tts-1)</h1>
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
        <select onChange={(e) => setVoice(e.target.value)}>
          {voiceList.map((voice) => (
            <option key={voice} value={voice}>
              {voice}
            </option>
          ))}
        </select>
        <audio ref={audioRef} controls></audio>
      </div>
    </div>
  );
}
