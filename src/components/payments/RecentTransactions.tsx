import React, { useState } from "react";

interface Transaction {
  id: string;
  orderId: string;
  customer: string;
  amount: string;
  method: string;
  status: string;
  date: string;
}

const MOCK_DATA: Transaction[] = [
  {
    id: "PAY-1001",
    orderId: "ORD-1234",
    customer: "John Doe",
    amount: "$45.00",
    method: "Credit Card",
    status: "Completed",
    date: "Jan 13, 2026 - 10:30 AM",
  },
  {
    id: "PAY-1002",
    orderId: "ORD-1235",
    customer: "Jane Smith",
    amount: "$89.00",
    method: "Cash",
    status: "Pending",
    date: "Jan 13, 2026 - 11:15 AM",
  },
  {
    id: "PAY-1003",
    orderId: "ORD-1236",
    customer: "Mike Johnson",
    amount: "$32.00",
    method: "UPI",
    status: "Completed",
    date: "Jan 13, 2026 - 09:45 AM",
  },
  {
    id: "PAY-1004",
    orderId: "ORD-1237",
    customer: "Sarah Williams",
    amount: "$67.00",
    method: "Debit Card",
    status: "Pending",
    date: "Jan 14, 2026 - 10:00 AM",
  },
  {
    id: "PAY-1005",
    orderId: "ORD-1238",
    customer: "David Brown",
    amount: "$28.00",
    method: "Credit Card",
    status: "Completed",
    date: "Jan 13, 2026 - 02:20 PM",
  },
  {
    id: "PAY-1006",
    orderId: "ORD-1239",
    customer: "Emily Davis",
    amount: "$54.00",
    method: "Cash",
    status: "Completed",
    date: "Jan 13, 2026 - 03:10 PM",
  },
  {
    id: "PAY-1007",
    orderId: "ORD-1240",
    customer: "Robert Wilson",
    amount: "$76.00",
    method: "UPI",
    status: "Pending",
    date: "Jan 14, 2026 - 09:00 AM",
  },
];

const badgeStyle = (value: string) => {
  switch (value) {
    case "Completed":
      return "bg-green-100 text-green-600";
    case "Pending":
      return "bg-orange-100 text-orange-600";
    case "Credit Card":
      return "bg-blue-100 text-blue-600";
    case "Cash":
      return "bg-green-100 text-green-600";
    case "UPI":
      return "bg-pink-100 text-pink-600";
    case "Debit Card":
      return "bg-purple-100 text-purple-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const RecentTransactions: React.FC = () => {
  const [page, setPage] = useState(1);

  return (
    <div
      className="bg-white w-full max-w-[1708px] h-full  rounded-[14px] border"
      style={{
        borderWidth: "1.25px",
        padding: "1.25px",
      }}
    >
      {/* Header */}
      <div className="p-5 border-b">
        <h3 className="text-[16px] font-semibold text-[#101828]">
          Recent Transactions
        </h3>
        <p className="text-sm text-gray-500">All payment transactions</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="py-3 px-5">Payment ID</th>
              <th className="py-3 px-5">Order ID</th>
              <th className="py-3 px-5">Customer</th>
              <th className="py-3 px-5">Amount</th>
              <th className="py-3 px-5">Payment Method</th>
              <th className="py-3 px-5">Status</th>
              <th className="py-3 px-5">Date & Time</th>
              <th className="py-3 px-5">Actions</th>
            </tr>
          </thead>

          <tbody>
            {MOCK_DATA.map((item) => (
              <tr
                key={item.id}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                <td className="py-4 px-5 text-sm">#{item.id}</td>

                <td className="py-4 px-5 text-blue-600 text-sm cursor-pointer">
                  #{item.orderId}
                </td>

                <td className="py-4 px-5 text-sm">{item.customer}</td>

                <td className="py-4 px-5 font-semibold text-sm">
                  {item.amount}
                </td>

                <td className="py-4 px-5">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${badgeStyle(
                      item.method
                    )}`}
                  >
                    {item.method}
                  </span>
                </td>

                <td className="py-4 px-5">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${badgeStyle(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="py-4 px-5 text-sm text-gray-500">
                  {item.date}
                </td>

                <td className="py-4 px-5 text-sm">
                  <div className="flex items-center gap-3">
                    <button className="text-blue-600 hover:underline">
                      View
                    </button>
                    <button className="flex items-center gap-1 hover:underline">
                      Invoice
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-4 border-t">
        <p className="text-sm text-gray-500">
          Showing 7 of 156 transactions
        </p>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border rounded-md text-sm">
            Previous
          </button>

          {[1, 2, 3].map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`px-3 py-1 rounded-md text-sm border ${
                page === n
                  ? "bg-blue-50 text-blue-600 border-blue-300"
                  : ""
              }`}
            >
              {n}
            </button>
          ))}

          <button className="px-3 py-1 border rounded-md text-sm">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
