import { useEffect, useState } from "react";
import JournalForm from "./JournalForm";
import JournalEntry from "./JournalEntry";

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);

  // Load entries from local storage when the component mounts
  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    setEntries(savedEntries);
  }, []);

  // Function to save a new entry
  const handleSave = (newEntry) => {
    const updatedEntries = [...entries, { ...newEntry, id: Date.now() }];
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    setShowForm(false);
  };

  // Function to edit an entry
  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setShowForm(true);
  };

  // Function to update an entry
  const handleUpdate = (updatedEntry) => {
    const updatedEntries = entries.map((entry) =>
      entry.id === updatedEntry.id ? updatedEntry : entry
    );
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    setEditingEntry(null);
    setShowForm(false);
  };

  // Function to delete an entry
  const handleDelete = (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
  };

  // Function to show details of a selected entry
  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
  };

  // Function to close the entry details view
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
