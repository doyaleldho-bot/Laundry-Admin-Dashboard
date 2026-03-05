import { useState } from "react";
import { api } from "../../api/axiosInstance";

const Header = () => {
  // State for start and end date
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDownload = async () => {
    try {
      // If no dates selected, backend can default to today
      const query = `?${startDate ? `startDate=${startDate}&` : ""}${endDate ? `endDate=${endDate}` : ""}`;

      const response = await api.get(`/dashboard/download-excel${query}`, {
        responseType: "blob", // Important!
      });

      // Create a downloadable URL
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "dashboard-report.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  return (
    <div className="flex items-center justify-between">
      {/* Left content */}
      <div>
        <h2 className="font-bold text-[24px] leading-[32px] text-[#101828]">
          Dashboard Overview
        </h2>
        <p className="font-normal text-[14px] leading-[20px] text-[#6A7282] pt-2">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Right content */}
      <div className="flex items-center space-x-2">
        {/* Date inputs */}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="h-9 rounded-[10px] border px-2"
          placeholder="Start Date"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="h-9 rounded-[10px] border px-2"
          placeholder="End Date"
        />

        {/* Download button */}
        <button
          onClick={handleDownload}
          className="h-9 rounded-[10px] text-[14px] leading-[20px] font-normal bg-[#FFFFFF] text-[#0A0A0A] px-4 border"
        >
          Download Report
        </button>
      </div>
    </div>
  );
};

export default Header;