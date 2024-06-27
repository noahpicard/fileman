"use client"
import { FC, useCallback, useEffect, useState } from "react";

const PromptField : FC = () => {

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(() => {
    if (prompt === "") return;
    if (loading) return;
    console.log(prompt);

    setLoading(true);

    const response = fetch('/api/submit_prompt', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
      }),
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.error('Error:', error);
    }).finally(() => {
      setPrompt("");
      setLoading(false);
    });

  }, [prompt]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        onSubmit();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [onSubmit]);

  return (
    <div className="mb-4 flex">
      <input
        id="prompt"
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt"
        className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      />
      <button
        type="submit"
        onClick={onSubmit}
        className="ml-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      >
        Submit
      </button>
    </div>
  );
}

export default PromptField;