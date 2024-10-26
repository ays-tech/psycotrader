import { useEffect, useState } from "react";
import JournalForm from "./JournalForm";
import JournalEntry from "./JournalEntry";

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    setEntries(savedEntries);
  }, []);

  const handleSave = (newEntry) => {
    const updatedEntries = [...entries, { ...newEntry, id: Date.now() }];
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    setShowForm(false);
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setShowForm(true);
  };

  const handleUpdate = (updatedEntry) => {
    const updatedEntries = entries.map((entry) =>
      entry.id === updatedEntry.id ? updatedEntry : entry
    );
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    setEditingEntry(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
  };

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
  };

  const handleCloseDetails = () => {
    setSelectedEntry(null);
  };

  return (
    <div className="h-[85vh] flex flex-col justify-between overflow-auto px-5 pt-3 bg-gray-900 text-white">
      <h2 className="text-2xl font-semibold mb-4">Trading Journal</h2>
      <button
        onClick={() => setShowForm(true)}
        className="mb-4 p-2 bg-green-500 rounded-lg"
      >
        Add Journal
      </button>

      {/* Journal Entries List */}
      <div className="overflow-auto mb-4">
        <h3 className="text-lg font-semibold">Your Entries</h3>
        {entries.length === 0 ? (
          <div className="flex justify-center items-center h-32">
            <span className="text-slate-400">No journal entries found.</span>
          </div>
        ) : (
          <div className="space-y-3 mt-3">
            {entries.map((entry) => (
              <JournalEntry
                key={entry.id}
                entry={entry}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onClick={handleEntryClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Journal Entry Form */}
      {showForm && (
        <JournalForm
          entry={editingEntry}
          onSave={editingEntry ? handleUpdate : handleSave}
          onClose={() => {
            setShowForm(false);
            setEditingEntry(null);
          }}
        />
      )}

      {/* Selected Journal Entry Details */}
      {selectedEntry && (
        <div className="mt-4 p-4 bg-[#232e3c] rounded-lg">
          <h3 className="text-lg font-semibold">Journal Entry Details</h3>
          <div className="mt-2">
            <p><strong>Instrument:</strong> {selectedEntry.instrument}</p>
            <p><strong>Date:</strong> {selectedEntry.date}</p>
            <p><strong>Lot Size:</strong> {selectedEntry.lotSize}</p>
            <p><strong>Position:</strong> {selectedEntry.longShort}</p>
            <p><strong>Entry Price:</strong> {selectedEntry.entryPrice}</p>
            <p><strong>Exit Price:</strong> {selectedEntry.exitPrice}</p>
            <p><strong>Stop Loss:</strong> {selectedEntry.stopLoss}</p>
            <p><strong>Take Profit:</strong> {selectedEntry.takeProfit}</p>
            <p><strong>Profit/Loss:</strong> {selectedEntry.profitLoss}</p>
            <p><strong>Improvements:</strong> {selectedEntry.improvements}</p>
            <p><strong>Emotions:</strong> {selectedEntry.emotions}</p>
            <p><strong>Remarks:</strong> {selectedEntry.remarks}</p>
            <p><strong>Trading Type:</strong> {selectedEntry.tradingType}</p>
          </div>
          <button
            onClick={handleCloseDetails}
            className="mt-3 p-2 bg-red-500 rounded-lg"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

// JournalForm.js
function JournalForm({ entry, onSave, onClose }) {
  const [formData, setFormData] = useState({
    date: entry ? entry.date : new Date().toLocaleDateString(),
    instrument: entry ? entry.instrument : "",
    lotSize: entry ? entry.lotSize : "",
    longShort: entry ? entry.longShort : "long",
    entryPrice: entry ? entry.entryPrice : "",
    exitPrice: entry ? entry.exitPrice : "",
    stopLoss: entry ? entry.stopLoss : "",
    takeProfit: entry ? entry.takeProfit : "",
    profitLoss: entry ? entry.profitLoss : "",
    improvements: entry ? entry.improvements : "",
    emotions: entry ? entry.emotions : "neutral",
    remarks: entry ? entry.remarks : "",
    tradingType: entry ? entry.tradingType : "crypto",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (
      !formData.instrument ||
      !formData.lotSize ||
      !formData.entryPrice ||
      !formData.exitPrice ||
      !formData.stopLoss ||
      !formData.takeProfit ||
      !formData.profitLoss
    ) {
      alert("Please fill in all fields before saving.");
      return;
    }

    onSave({ ...formData, id: entry ? entry.id : Date.now() });
  };

  return (
    <div className="mt-4 p-4 bg-[#232e3c] rounded-lg">
      <h3 className="text-lg font-semibold">{entry ? "Edit" : "New"} Journal Entry</h3>
      <input
        name="instrument"
        type="text"
        placeholder="Instrument"
        value={formData.instrument}
        onChange={handleChange}
        className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
      />
      <input
        name="lotSize"
        type="number"
        placeholder="Lot Size"
        value={formData.lotSize}
        onChange={handleChange}
        className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
      />
      <select
        name="longShort"
        value={formData.longShort}
        onChange={handleChange}
        className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
      >
        <option value="long">Long</option>
        <option value="short">Short</option>
      </select>
      <input
        name="entryPrice"
        type="number"
        placeholder="Entry Price"
        value={formData.entryPrice}
        onChange={handleChange}
        className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
      />
      <input
        name="exitPrice"
        type="number"
        placeholder="Exit Price"
        value={formData.exitPrice}
        onChange={handleChange}
        className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
      />
      <input
        name="stopLoss"
        type="number"
        placeholder="Stop Loss"
        value={formData.stopLoss}
        onChange={handleChange}
        className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
      />
      <input
        name="takeProfit"
        type="number"
        placeholder="Take Profit"
        value={formData.takeProfit}
        onChange={handleChange}
        className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
      />
      <input
        name="profitLoss"
        type="text"
        placeholder="Profit/Loss"
        value={formData.profitLoss}
        onChange={handleChange}
        className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
      />
      <textarea
        name="improvements"
        placeholder="Improvements"
        value={formData.improvements}
        onChange={handleChange}
        className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
      />
      <textarea
        name="emotions"
        placeholder="Emotions"
        value={formData.emotions}
        onChange={handleChange}
        className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
      />
      <textarea
        name="remarks"
        placeholder="Remarks"
        value={formData.remarks}
        onChange={handleChange}
        className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
      />
      <select
        name="tradingType"
        value={formData.tradingType}
        onChange={handleChange}
        className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
      >
        <option value="crypto">Crypto</option>
        <option value="forex">Forex</option>
        <option value="stocks">Stocks</option>
      </select>

      <div className="flex justify-between mt-4">
        <button
          onClick={handleSave}
          className="p-2 bg-blue-500 rounded-lg"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="p-2 bg-red-500 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// JournalEntry.js
export default function JournalEntry({ entry, onEdit, onDelete, onClick }) {
  return (
    <div
      className="p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
      onClick={() => onClick(entry)}
    >
      <h4 className="font-semibold">{entry.instrument}</h4>
      <p>Date: {entry.date}</p>
      <p>Lot Size: {entry.lotSize}</p>
      <p>Position: {entry.longShort}</p>
      <div className="flex justify-between mt-2">
        <button onClick={(e) => { e.stopPropagation(); onEdit(entry); }} className="text-yellow-500">Edit</button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(entry.id); }} className="text-red-500">Delete</button>
      </div>
    </div>
  );
}
