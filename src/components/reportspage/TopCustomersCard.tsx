import React, { useEffect, useState } from "react";
import { api } from "../../api/axiosInstance";

interface Customer {
  name: string;
  orders: number;
  amount: string;
}

const TopCustomersCard = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);

      const fetchTopCustomers = async () => {
    try {
      const res = await api.get("/top-customers");
      setCustomers(res.data);
    } catch (err) {
      console.error("Failed to fetch top customers", err);
    }
  };

  useEffect(() => {
    fetchTopCustomers();
  }, []);

  return (
    <div className="bg-white border rounded-[14px] w-full max-w-[420px] h-[450px] p-6">
      <div>
        <h3 className="font-semibold text-gray-900">Top Customers</h3>
        <p className="text-sm text-gray-500">By total orders</p>
      </div>

      <div className="mt-6 space-y-4">
        {customers.map((c, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-indigo-500 text-white text-xs flex items-center justify-center">
                {i + 1}
              </div>

              <div>
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-xs text-gray-400">
                  {c.orders} orders 
                </p>
              </div>
            </div>

            <span className="text-sm font-semibold text-green-600">
              {c.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCustomersCard;
