import { useEffect, useState } from "react";

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    date: new Date().toLocaleDateString(),
    instrument: "",
    lotSize: "",
    longShort: "long", // Default to Long
    entryPrice: "",
    exitPrice: "",
    stopLoss: "",
    takeProfit: "",
    profitLoss: "",
    improvements: "",
    emotions: "neutral",
    remarks: "",
    tradingType: "crypto", // Default trading type
  });

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    setEntries(savedEntries);
  }, []);

  const handleSave = () => {
    const updatedEntries = [...entries, { ...newEntry, id: Date.now() }];
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    setNewEntry({
      date: new Date().toLocaleDateString(),
      instrument: "",
      lotSize: "",
      longShort: "long",
      entryPrice: "",
      exitPrice: "",
      stopLoss: "",
      takeProfit: "",
      profitLoss: "",
      improvements: "",
      emotions: "neutral",
      remarks: "",
      tradingType: "crypto",
    });
    setShowForm(false);
  };

  return (
    <div className="h-[85vh] flex flex-col justify-between overflow-auto px-5 pt-3 bg-gray-900 text-white">
      <h2 className="text-2xl font-semibold mb-4">Trading Journal</h2>

      {/* Journal Entries List */}
      <div className="overflow-auto mb-4">
        <h3 className="text-lg font-semibold">Your Entries</h3>
        {entries.length === 0 ? (
          <div className="flex justify-center items-center h-32">
            <span className="text-slate-400">No journal entries found.</span>
            <button
              onClick={() => setShowForm(true)}
              className="ml-2 p-2 bg-green-500 rounded-lg"
            >
              <span>🖊️</span> Add Journal
            </button>
          </div>
        ) : (
          <div className="space-y-3 mt-3">
            {entries.map((entry) => (
              <div key={entry.id} className="bg-[#232e3c] rounded-lg p-3">
                <div className="text-slate-300">{entry.instrument}</div>
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-slate-400">{entry.date}</span>
                  <span className="text-sm text-slate-400">{entry.profitLoss}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Journal Entry Form */}
      {showForm && (
        <div className="mt-4 p-4 bg-[#232e3c] rounded-lg">
          <h3 className="text-lg font-semibold">New Journal Entry</h3>
          <input
            type="text"
            placeholder="Instrument"
            value={newEntry.instrument}
            onChange={(e) => setNewEntry({ ...newEntry, instrument: e.target.value })}
            className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
          />
          <input
            type="number"
            placeholder="Lot Size"
            value={newEntry.lotSize}
            onChange={(e) => setNewEntry({ ...newEntry, lotSize: e.target.value })}
            className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
          />
          <select
            value={newEntry.longShort}
            onChange={(e) => setNewEntry({ ...newEntry, longShort: e.target.value })}
            className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
          >
            <option value="long">Long</option>
            <option value="short">Short</option>
          </select>
          <input
            type="number"
            placeholder="Entry Price"
            value={newEntry.entryPrice}
            onChange={(e) => setNewEntry({ ...newEntry, entryPrice: e.target.value })}
            className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
          />
          <input
            type="number"
            placeholder="Exit Price"
            value={newEntry.exitPrice}
            onChange={(e) => setNewEntry({ ...newEntry, exitPrice: e.target.value })}
            className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
          />
          <input
            type="number"
            placeholder="Stop Loss"
            value={newEntry.stopLoss}
            onChange={(e) => setNewEntry({ ...newEntry, stopLoss: e.target.value })}
            className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
          />
          <input
            type="number"
            placeholder="Take Profit"
            value={newEntry.takeProfit}
            onChange={(e) => setNewEntry({ ...newEntry, takeProfit: e.target.value })}
            className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
          />
          <input
            type="text"
            placeholder="Profit/Loss"
            value={newEntry.profitLoss}
            onChange={(e) => setNewEntry({ ...newEntry, profitLoss: e.target.value })}
            className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
          />
          <textarea
            placeholder="Improvements"
            value={newEntry.improvements}
            onChange={(e) => setNewEntry({ ...newEntry, improvements: e.target.value })}
            className="mt-2 p-2 w-full bg-gray-800 rounded-lg resize-none"
            rows={3}
          />
          <select
            value={newEntry.emotions}
            onChange={(e) => setNewEntry({ ...newEntry, emotions: e.target.value })}
            className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
          >
            <option value="neutral">Select Emotion</option>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="frustrated">Frustrated</option>
            <option value="confident">Confident</option>
            <option value="anxious">Anxious</option>
          </select>
          <textarea
            placeholder="Remarks"
            value={newEntry.remarks}
            onChange={(e) => setNewEntry({ ...newEntry, remarks: e.target.value })}
            className="mt-2 p-2 w-full bg-gray-800 rounded-lg resize-none"
            rows={3}
          />
          <select
            value={newEntry.tradingType}
            onChange={(e) => setNewEntry({ ...newEntry, tradingType: e.target.value })}
            className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
          >
            <option value="crypto">Crypto</option>
            <option value="forex">Forex</option>
            <option value="stocks">Stocks</option>
          </select>
          <button
            onClick={handleSave}
            className="mt-3 p-2 bg-green-500 rounded-lg"
          >
            View Journal
          </button>
        </div>
      )}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mt-4 p-2 bg-blue-500 rounded-lg"
      >
        {showForm ? "Cancel" : "Add New Journal Entry"}
      </button>
    </div>
  );
}
