import { useState } from "react";
import { Search } from "lucide-react";

interface Props {
  onSearch?: (value: string) => void;
  onStatusChange?: (status: string) => void;
    onPaymentChange?: (payment: string) => void;
}

const statuses = [
  "All",
  "SCHEDULED",
  "PICKUP",
  "WASHING",
  "DRYING",
  "IRONING",
  "OUT_FOR_DELIVERY",
  "DELIVERED"
];

const OrderToolbar: React.FC<Props> = ({ onSearch, onStatusChange ,onPaymentChange}) => {
  const [activeStatus, setActiveStatus] = useState("All (8)");
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("All Payments");

  const handleStatus = (status: string) => {
    setActiveStatus(status);
    onStatusChange?.(status);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearch?.(e.target.value);
  };

  const handlePaymentChange = (payment: string) => {
  setPaymentFilter(payment);
    onPaymentChange?.(payment); 
};
  return (
    <div className="w-full bg-white rounded-[14px] border border-[#E5E7EB] p-4 space-y-3 shadow-sm">
      {/* Top Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="flex items-center gap-2 bg-[#F3F4F6] rounded-lg px-3 h-[40px] flex-1 min-w-[260px]">
          <Search size={16} className="text-gray-400" />
          <input
            value={search}
            onChange={handleSearch}
            placeholder="Search by order ID or customer name..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>
        <select
          className="h-[40px] px-3 rounded-lg border border-gray-200 text-sm"
          value={paymentFilter}
          onChange={(e) => handlePaymentChange(e.target.value)}
        >
          <option>All</option>
          <option>Paid</option>
          <option>Pending</option>
        </select>
      </div>

      {/* Status Tabs */}
      <div className="bg-[#F3F4F6] rounded-lg p-1 flex justify-between overflow-x-auto">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => handleStatus(s)}
            className={`px-4 py-1.5 text-sm rounded-md whitespace-nowrap transition
              ${
                activeStatus === s
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500 hover:text-gray-800"
              }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderToolbar;
 