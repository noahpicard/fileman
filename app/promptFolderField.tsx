"use client"
import { FC, useCallback, useEffect, useState } from "react";

const PromptFolderField : FC<{folder?: string}> = ({folder="prompts"}) => {

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostRecentPrompt, setMostRecentPrompt] = useState<string[]>([]);

  const updateMostRecentPrompt = useCallback(() => {
    fetch(`/api/read_recent_prompt_from_folder?index=0&folder=${folder}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      console.log("response", response);
      return response.json();
    }).then((data) => {
      console.log("response body", data);
      setMostRecentPrompt(data);
    }).catch((error) => {
      console.error('Error:', error);
    });
  }, []);

  useEffect(() => {
    updateMostRecentPrompt();
  }, []);

  const onSubmit = useCallback(() => {
    if (prompt === "") return;
    if (loading) return;
    console.log(prompt);

    setLoading(true);

    const response = fetch('/api/submit_prompt_to_folder', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        folder,
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
      updateMostRecentPrompt();
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
    <div className="flex gap-4 items-center">
      <h3 className="w-[32px] text-gray-200 center text-center">{folder}</h3>
      <div className="w-full h-full text-white font-bold center text-center overflow-x-auto text-nowrap"><p>{mostRecentPrompt}</p></div>
      <input
        id="prompt"
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt"
        className="w-full rounded-md border border-gray-300 px-2 py-1 bg-transparent text-gray-100 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      />
      <button
        type="submit"
        onClick={onSubmit}
        className="rounded-md bg-blue-600 px-2 py-1 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      >
        Set
        </button>
      
    </div>
  );
}

export default PromptFolderField;
