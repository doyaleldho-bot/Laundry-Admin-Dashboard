interface revenueData {
  name: string;
  totalQuantity: number;
  totalRevenue: number;
}


const ServiceRevenueCard = ({ data }: { data: revenueData[]}) => {
  const max = Math.max(...data.map((d) => d.totalRevenue));

  return (
    <div className="bg-white border rounded-[14px] w-[842px] h-[450px] p-6">
      <h3 className="font-semibold text-gray-900">Service Revenue</h3>
      <p className="text-sm text-gray-500">Revenue by service type</p>

      <svg viewBox="0 0 100 60" className="w-full h-[320px] mt-6">
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="0"
            y1={10 + i * 10}
            x2="100"
            y2={10 + i * 10}
            stroke="#e5e7eb"
            strokeDasharray="2 2"
          />
        ))}

        {data.map((d, i) => {
          const barHeight = (d.totalRevenue / max) * 35;
          const x = 8 + i * 18;
          const y = 50 - barHeight;

          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width="10"
                height={barHeight}
                rx="2"
                fill="#a855f7"
              />

              <text
                x={x + 5}
                y={y - 2}
                textAnchor="middle"
                fontSize="3"
                fill="#111827"
              >
                ₹{d.totalRevenue.toLocaleString()}
              </text>

              <text
                x={x + 5}
                y="56"
                textAnchor="middle"
                fontSize="2.5"
                fill="#6b7280"
              >
                {d.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default ServiceRevenueCard;
