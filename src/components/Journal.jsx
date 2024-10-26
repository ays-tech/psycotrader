import { useEffect, useState } from "react";

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [entry, setEntry] = useState("");
  const [emotion, setEmotion] = useState("neutral"); // Default emotion

  useEffect(() => {
    // Load saved entries from localStorage
    const savedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    setEntries(savedEntries);
  }, []);

  const handleSave = () => {
    const newEntry = {
      id: Date.now(),
      text: entry,
      emotion: emotion,
      timestamp: new Date().toLocaleString(),
    };
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    setEntry("");
    setEmotion("neutral");
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
  };

  return (
    <div className="h-[85vh] flex flex-col justify-between overflow-auto px-5 pt-3 bg-gray-900 text-white">
      <h2 className="text-2xl font-semibold mb-4">Trading Journal</h2>

      {/* Entry Input Section */}
      <div className="flex flex-col mb-4">
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write your reflections here..."
          className="p-3 bg-[#232e3c] rounded-lg resize-none"
          rows={5}
        />
        <select
          value={emotion}
          onChange={(e) => setEmotion(e.target.value)}
          className="mt-2 p-2 bg-[#232e3c] rounded-lg"
        >
          <option value="neutral">Select Emotion</option>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="frustrated">Frustrated</option>
          <option value="confident">Confident</option>
          <option value="anxious">Anxious</option>
        </select>
        <button
          onClick={handleSave}
          className="mt-3 p-2 bg-green-500 rounded-lg"
          disabled={!entry || emotion === "neutral"} // Disable if entry is empty or emotion is neutral
        >
          Save Entry
        </button>
      </div>

      {/* Entries List */}
      <div className="overflow-auto">
        <h3 className="text-lg font-semibold">Your Entries</h3>
        {entries.length === 0 ? (
          <p className="text-slate-400">No entries yet. Start writing!</p>
        ) : (
          <div className="space-y-3 mt-3">
            {entries.map((entry) => (
              <div key={entry.id} className="bg-[#232e3c] rounded-lg p-3">
                <div className="text-slate-300">{entry.text}</div>
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-slate-400">{entry.emotion}</span>
                  <span className="text-sm text-slate-400">{entry.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
