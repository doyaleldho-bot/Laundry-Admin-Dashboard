import React from "react";
import { Search } from "lucide-react";

interface CustomerSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomerSearchBar: React.FC<CustomerSearchBarProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="bg-white rounded-xl border p-3 mb-6">
      <div className="flex items-center gap-3">
        {/* SEARCH */}
        <div className="flex items-center gap-2 flex-1 bg-gray-50 border rounded-lg px-3 h-11">
          <Search size={16} className="text-gray-400" />
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search by name, email, or phone..."
            className="w-full bg-transparent outline-none text-sm text-gray-700"
          />
        </div>

      </div>
    </div>
  );
};

export default CustomerSearchBar;
