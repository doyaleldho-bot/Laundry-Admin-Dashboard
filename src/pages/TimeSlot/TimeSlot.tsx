import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Plus, Pencil, Calendar, AlertCircle } from "lucide-react";
import { formatTime } from "../../utils/formatDate";

type Slot = {
  id: string;
  date: string;
  fromTime: string;
  toTime: string;
  maxOrders: number;
  currentOrders: number;
  status: "ACTIVE" | "INACTIVE" | "FULL" | "FEW";
  isHoliday: boolean;
};

const API = "http://localhost:5001/api";

export default function TimeSlotDashboard() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [holidays, setHolidays] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"manage" | "generate" | "holidays">("manage");

  const [form, setForm] = useState({
    date: "",
    fromTime: "",
    toTime: "",
    maxOrders: 10,
  });

  const [generateForm, setGenerateForm] = useState({
    date: "",
    fromTime: "09:00",
    toTime: "18:00",
    maxOrders: 10,
    slotDurationMinutes: 120,
  });

  // FETCH SLOTS
  const fetchSlots = async () => {
    try {
      const query = selectedDate ? `?date=${selectedDate}` : "";
      const res = await axios.get(`${API}/get-slot${query}`);
      const data = res.data?.data || [];
      setSlots(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setSlots([]);
    }
  };

  // FETCH HOLIDAYS
  const fetchHolidays = async () => {
    try {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);
      
      const res = await axios.get(`${API}/holidays`, {
        params: {
          startDate: startDate.toISOString().split("T")[0],
          endDate: endDate.toISOString().split("T")[0],
        },
      });
      setHolidays(res.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSlots();
    fetchHolidays();
  }, [selectedDate]);

  // STATUS CHANGE
  const handleStatusChange = async (id: string, status: string) => {
    try {
      await axios.put(`${API}/update/${id}`, { status });
      fetchSlots();
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  };

  // CREATE / UPDATE SLOT
  const handleSave = async () => {
    if (!form.date || !form.fromTime || !form.toTime) {
      alert("All fields are required");
      return;
    }

    if (form.fromTime >= form.toTime) {
      alert("From time must be less than To time");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${API}/update/${editingId}`, {
          fromTime: form.fromTime,
          toTime: form.toTime,
          maxOrders: form.maxOrders,
        });
      } else {
        await axios.post(`${API}/create-slot`, {
          date: form.date,
          fromTime: form.fromTime,
          toTime: form.toTime,
          maxOrders: form.maxOrders,
        });
      }

      setForm({
        date: "",
        fromTime: "",
        toTime: "",
        maxOrders: 10,
      });
      setEditingId(null);
      fetchSlots();
    } catch (err) {
      console.error(err);
      alert("Error saving slot: " + (err as any).response?.data?.message);
    }
  };

  // DELETE SLOT
  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this slot?")) return;

    try {
      await axios.delete(`${API}/delete-slot/${id}`);
      fetchSlots();
    } catch (err) {
      console.error(err);
      alert("Error deleting slot");
    }
  };

  // EDIT SLOT
  const handleEdit = (slot: Slot) => {
    setForm({
      date: slot.date,
      fromTime: slot.fromTime,
      toTime: slot.toTime,
      maxOrders: slot.maxOrders,
    });
    setEditingId(slot.id);
  };

  // AUTO-GENERATE SLOTS FOR MONTH
  const handleGenerateMonth = async () => {
    if (!generateForm.date) {
      alert("Please select a start date");
      return;
    }

    try {
      const res = await axios.post(`${API}/generate-month`, generateForm);
      alert(res.data?.message);
      setGenerateForm({
        date: "",
        fromTime: "09:00",
        toTime: "18:00",
        maxOrders: 10,
        slotDurationMinutes: 120,
      });
      fetchSlots();
    } catch (err) {
      console.error(err);
      alert("Error generating slots: " + (err as any).response?.data?.message);
    }
  };

  // MARK HOLIDAY
  const handleMarkHoliday = async (date: string) => {
    try {
      await axios.post(`${API}/mark-holiday`, { date });
      fetchHolidays();
      fetchSlots();
    } catch (err) {
      console.error(err);
      alert("Error marking holiday");
    }
  };

  // UNMARK HOLIDAY
  const handleUnmarkHoliday = async (date: string) => {
    try {
      await axios.post(`${API}/unmark-holiday`, { date });
      fetchHolidays();
      fetchSlots();
    } catch (err) {
      console.error(err);
      alert("Error unmarking holiday");
    }
  };

  // FILTER SLOTS
  const filteredSlots = slots.filter(
    (slot) =>
      slot.fromTime.toLowerCase().includes(search.toLowerCase()) ||
      slot.toTime.toLowerCase().includes(search.toLowerCase()) ||
      slot.date.includes(search)
  );

  // GROUP SLOTS BY DATE
  const groupedSlots: { [key: string]: Slot[] } = {};
  filteredSlots.forEach((slot) => {
    if (!groupedSlots[slot.date]) {
      groupedSlots[slot.date] = [];
    }
    groupedSlots[slot.date].push(slot);
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Time Slot Management</h1>

      {/* TABS */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab("manage")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "manage"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
        >
          Manage Slots
        </button>
        <button
          onClick={() => setActiveTab("generate")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "generate"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
        >
          Auto-Generate
        </button>
        <button
          onClick={() => setActiveTab("holidays")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "holidays"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
        >
          Holidays
        </button>
      </div>

      {/* MANAGE SLOTS TAB */}
      {activeTab === "manage" && (
        <div className="space-y-6">
          {/* FORM */}
          <div className="bg-white rounded-2xl shadow p-4 grid md:grid-cols-5 gap-4">
            {/* DATE */}
            <div>
              <label className="text-sm font-semibold">Date</label>
              <input
                type="date"
                className="border p-2 rounded w-full mt-1"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>

            {/* FROM */}
            <div>
              <label className="text-sm font-semibold">From Time</label>
              <input
                type="time"
                className="border p-2 rounded w-full mt-1"
                value={form.fromTime}
                onChange={(e) => setForm({ ...form, fromTime: e.target.value })}
              />
            </div>

            {/* TO */}
            <div>
              <label className="text-sm font-semibold">To Time</label>
              <input
                type="time"
                className="border p-2 rounded w-full mt-1"
                value={form.toTime}
                onChange={(e) => setForm({ ...form, toTime: e.target.value })}
              />
            </div>

            {/* MAX */}
            <div>
              <label className="text-sm font-semibold">Max Orders</label>
              <input
                type="number"
                className="border p-2 rounded w-full mt-1"
                value={form.maxOrders}
                onChange={(e) =>
                  setForm({ ...form, maxOrders: Number(e.target.value) })
                }
              />
            </div>

            {/* BUTTON */}
            <div className="flex items-end">
              <button
                onClick={handleSave}
                className={`${
                  editingId ? "bg-yellow-500" : "bg-blue-500"
                } text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full`}
              >
                {editingId ? <Pencil size={16} /> : <Plus size={16} />}
                {editingId ? "Update" : "Add"}
              </button>
            </div>
          </div>

          {/* DATE FILTER */}
          <div className="flex gap-4 items-center">
            <input
              type="date"
              className="border p-2 rounded"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <button
              onClick={() => setSelectedDate("")}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Clear Filter
            </button>
            <input
              placeholder="Search by time..."
              className="border p-2 rounded flex-1"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* SLOTS BY DATE */}
          <div className="space-y-6">
            {Object.keys(groupedSlots)
              .sort()
              .map((date) => {
                const isHoliday = holidays.includes(date);
                const dateObj = new Date(date + "T00:00:00");
                const dayName = dateObj.toLocaleDateString("en-US", {
                  weekday: "long",
                });

                return (
                  <div key={date} className="bg-white rounded-lg shadow overflow-hidden">
                    {/* DATE HEADER */}
                    <div
                      className={`p-4 flex justify-between items-center ${
                        isHoliday ? "bg-red-50" : "bg-blue-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Calendar size={20} />
                        <h3 className="text-lg font-bold">
                          {date} ({dayName})
                        </h3>
                        {isHoliday && (
                          <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                            <AlertCircle size={14} /> HOLIDAY
                          </span>
                        )}
                      </div>
                      {!isHoliday && (
                        <button
                          onClick={() => handleMarkHoliday(date)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                        >
                          Mark Holiday
                        </button>
                      )}
                      {isHoliday && (
                        <button
                          onClick={() => handleUnmarkHoliday(date)}
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                        >
                          Unmark Holiday
                        </button>
                      )}
                    </div>

                    {/* SLOTS TABLE */}
                    {groupedSlots[date].length > 0 && (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="p-2 border text-left">From</th>
                              <th className="p-2 border text-left">To</th>
                              <th className="p-2 border text-center">Max Orders</th>
                              <th className="p-2 border text-center">Current</th>
                              <th className="p-2 border text-left">Status</th>
                              <th className="p-2 border text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {groupedSlots[date].map((slot) => (
                              <tr key={slot.id} className={isHoliday ? "bg-red-50" : ""}>
                                <td className="p-2 border">{formatTime(slot.fromTime)}</td>
                                <td className="p-2 border">{formatTime(slot.toTime)}</td>
                                <td className="p-2 border text-center">{slot.maxOrders}</td>
                                <td className="p-2 border text-center">{slot.currentOrders}</td>
                                <td className="p-2 border">
                                  <select
                                    value={slot.status}
                                    onChange={(e) =>
                                      handleStatusChange(slot.id, e.target.value)
                                    }
                                    disabled={isHoliday}
                                    className={`border p-1 rounded w-full ${
                                      isHoliday ? "bg-gray-100 cursor-not-allowed" : ""
                                    }`}
                                  >
                                    <option value="ACTIVE">Active</option>
                                    <option value="FEW">Few Left</option>
                                    <option value="FULL">Full</option>
                                    <option value="INACTIVE">Inactive</option>
                                  </select>
                                </td>
                                <td className="p-2 border text-center">
                                  <div className="flex justify-center gap-1">
                                    <button
                                      className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                                      onClick={() => handleEdit(slot)}
                                      disabled={isHoliday}
                                    >
                                      <Pencil size={12} />
                                    </button>
                                    <button
                                      className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                                      onClick={() => handleDelete(slot.id)}
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })}
            {filteredSlots.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No slots found
              </div>
            )}
          </div>
        </div>
      )}

      {/* AUTO-GENERATE TAB */}
      {activeTab === "generate" && (
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Auto-Generate Slots for Month</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold">Start Date</label>
              <input
                type="date"
                className="border p-2 rounded w-full mt-1"
                value={generateForm.date}
                onChange={(e) =>
                  setGenerateForm({ ...generateForm, date: e.target.value })
                }
              />
              <p className="text-xs text-gray-500 mt-1">
                Will generate slots for the next 30 days
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold">Slot Duration (minutes)</label>
              <input
                type="number"
                className="border p-2 rounded w-full mt-1"
                value={generateForm.slotDurationMinutes}
                onChange={(e) =>
                  setGenerateForm({
                    ...generateForm,
                    slotDurationMinutes: Number(e.target.value),
                  })
                }
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Business Opening</label>
              <input
                type="time"
                className="border p-2 rounded w-full mt-1"
                value={generateForm.fromTime}
                onChange={(e) =>
                  setGenerateForm({ ...generateForm, fromTime: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Business Closing</label>
              <input
                type="time"
                className="border p-2 rounded w-full mt-1"
                value={generateForm.toTime}
                onChange={(e) =>
                  setGenerateForm({ ...generateForm, toTime: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Max Orders per Slot</label>
              <input
                type="number"
                className="border p-2 rounded w-full mt-1"
                value={generateForm.maxOrders}
                onChange={(e) =>
                  setGenerateForm({
                    ...generateForm,
                    maxOrders: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <button
            onClick={handleGenerateMonth}
            className="mt-6 w-full bg-green-500 text-white px-6 py-3 rounded flex items-center justify-center gap-2 font-semibold"
          >
            <Plus size={18} /> Generate Slots
          </button>
        </div>
      )}

      {/* HOLIDAYS TAB */}
      {activeTab === "holidays" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Holiday Calendar</h2>
            <p className="text-gray-600 mb-4">
              Holidays disable all time slots for that day
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {holidays.map((date) => (
                <div
                  key={date}
                  className="bg-red-50 border-2 border-red-300 p-4 rounded flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold text-red-600">{date}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(date + "T00:00:00").toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => handleUnmarkHoliday(date)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Remove
                  </button>
                </div>
              ))}
              {holidays.length === 0 && (
                <p className="col-span-full text-center text-gray-500 py-8">
                  No holidays set
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}