import React from "react";

interface PendingItem {
  id: string;
  orderId: string;
  customer: string;
  date: string;
  amount: string;
}

const mockPending: PendingItem[] = [
  {
    id: "1",
    orderId: "ORD-1235",
    customer: "Jane Smith",
    date: "Jan 13, 2026 - 11:15 AM",
    amount: "$89.00",
  },
  {
    id: "2",
    orderId: "ORD-1237",
    customer: "Sarah Williams",
    date: "Jan 14, 2026 - 10:00 AM",
    amount: "$67.00",
  },
  {
    id: "3",
    orderId: "ORD-1240",
    customer: "Robert Wilson",
    date: "Jan 14, 2026 - 09:00 AM",
    amount: "$76.00",
  },
];

const PendingCollections: React.FC = () => {
  return (
    <div
      className="bg-white rounded-[14px] border"
      style={{
        width: "1761px",
        height: "365px",
      padding: "20px",
      }}
    >
      <h3 className="text-[16px] font-semibold text-[#101828] mb-5">
        Pending Collections
      </h3>

      <div className="flex flex-col gap-4">
        {mockPending.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-[#FFF6EC] border border-[#FDBA74] rounded-xl px-5 py-4"
          >
            {/* Left */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-blue-600 cursor-pointer">
                  #{item.orderId}
                </span>
                <span className="text-sm text-[#101828]">
                  {item.customer}
                </span>
              </div>

              <p className="text-xs text-gray-500 mt-1">{item.date}</p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-5">
              <span className="text-sm font-semibold text-[#101828]">
                {item.amount}
              </span>

              <button className="px-4 py-1.5 rounded-lg border border-gray-300 text-sm hover:bg-gray-100 transition">
                Notify
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingCollections;
