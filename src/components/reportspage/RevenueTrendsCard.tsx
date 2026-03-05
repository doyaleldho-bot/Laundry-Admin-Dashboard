import React, { useEffect, useState } from "react";
import { api } from "../../api/axiosInstance";

const RevenueTrendsCard = () => {
const [data, setData] = useState([
  { month: "Jan", value: 0 },
  { month: "Feb", value: 0 },
  { month: "Mar", value: 0 },
  { month: "Apr", value: 0 },
  { month: "May", value: 0 },
  { month: "Jun", value: 0 },
  { month: "Jul", value: 0 },
  { month: "Aug", value: 0 },
  { month: "Sep", value: 0 },
  { month: "Oct", value: 0 },
  { month: "Nov", value: 0 },
  { month: "Dec", value: 0 },
]);

  // Fetch API monthly revenue
  const fetchMonthlyRevenue = async () => {
    try {
      const updatedData = await Promise.all(
        data.map(async (item, i) => {
          const monthNumber = (i + 1).toString().padStart(2, "0"); // "01", "02" ...
          const res = await api.get(`/dashboard/monthly-stats?month=${monthNumber}`);
          return {
            month: item.month,
            value: Number(res.data.totalRevenue) || 0,
          };
        })
      );
      setData(updatedData);
    } catch (err) {
      console.error("Failed to fetch monthly revenue", err);
    }
  };

  useEffect(() => {
    fetchMonthlyRevenue();
  }, []);

  // Dynamically set max value for Y-axis
  const maxValue = Math.max(...data.map(d => d.value), 100); // avoid division by zero

  const getX = (i: number) => 60 + (i * 980) / (data.length - 1);
  const getY = (v: number) => 300 - (v / maxValue) * 240;

  // Path for line
  const path = data
    .map((d, i) => {
      const x = getX(i);
      const y = getY(d.value);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  // Path for filled area under the line
  const fillPath = `
    ${path}
    L ${getX(data.length - 1)} 300
    L ${getX(0)} 300
    Z
  `;

  return (
    <div className="bg-white border rounded-[14px] w-full max-w-[1131px] h-[450px] p-6">
      <div>
        <h3 className="font-semibold text-gray-900">Revenue Trends</h3>
        <p className="text-sm text-gray-500">
          Monthly revenue and order growth
        </p>
      </div>

      <svg className="mt-6 w-full h-[330px]">
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="60"
            x2="1040"
            y1={60 + i * 60}
            y2={60 + i * 60}
            stroke="#E5E7EB"
            strokeDasharray="3 3"
          />
        ))}

        {/* Vertical grid lines */}
        {data.map((_, i) => (
          <line
            key={i}
            y1="60"
            y2="300"
            x1={getX(i)}
            x2={getX(i)}
            stroke="#E5E7EB"
            strokeDasharray="3 3"
          />
        ))}

        {/* Axes */}
        <line x1="60" y1="60" x2="60" y2="300" stroke="#9CA3AF" />
        <line x1="60" y1="300" x2="1040" y2="300" stroke="#9CA3AF" />

        {/* Y-axis labels */}
        {[0, 10000, 20000, 30000, 40000].map((v) => (
          <text
            key={v}
            x="20"
            y={300 - (v / maxValue) * 240 + 4}
            fontSize="12"
            fill="#9CA3AF"
          >
            {v.toLocaleString()}
          </text>
        ))}

        {/* Filled area under line */}
        <path d={fillPath} fill="url(#revenueFill)" />

        {/* Line */}
        <path d={path} fill="none" stroke="#2563EB" strokeWidth="2.5" />

        {/* Value labels */}
        {data.map((d, i) => (
          <text
            key={i}
            x={getX(i)}
            y={getY(d.value) - 10}
            fontSize="12"
            textAnchor="middle"
            fill="#111827"
            fontWeight="600"
          >
            {d.value.toLocaleString()}
          </text>
        ))}

        {/* X-axis labels */}
        {data.map((d, i) => (
          <text
            key={d.month}
            x={getX(i)}
            y="325"
            fontSize="12"
            textAnchor="middle"
            fill="#9CA3AF"
          >
            {d.month}
          </text>
        ))}
      </svg>
    </div>
  );
};

export default RevenueTrendsCard;