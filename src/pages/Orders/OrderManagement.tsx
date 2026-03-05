import React, { useEffect, useMemo, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import OrderToolbar from "../../components/OrderManagement/OrderToolbar";
import editicon from "../../assets/icons/editicon.svg";
import { api } from "../../api/axiosInstance";
import Modal from "../../components/Modal/Modal";
import { toast } from "react-toastify";

/* ---------------- TYPES ---------------- */
export interface Order {
  _id: string;
  orderId: string;
  customerName: string;
  phone: string;
  items: string;
  serviceType: string;
  pickupTime: string;
  deliveryDate: string;
  status: string;
  paymentStatus: string;
  amount: number;
}
const ORDER_STATUSES = [
  "SCHEDULED",
  "PICKUP",
  "WASHING",
  "DRYING",
  "IRONING",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
];

/* ---------------- COMPONENT ---------------- */
const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [data, setData] = useState<Order | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
    const [status, setStatus] = useState<String>();


  /* ---------------- FETCH ORDERS ---------------- */
  const fetchOrders = async (status?: string) => {
    try {
      setLoading(true);
      setError(null);

      const params: Record<string, string> = {};
      if (status && status !== "All") params.status = status;
      const res = await api.get("/all/order", { params });
      setOrders(res.data.data || res.data);

    } catch (err) {
      console.warn("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- SOCKET.IO LIVE UPDATES ---------------- */
  useEffect(() => {
    fetchOrders();

    socketRef.current = io("http://localhost:5001");
    socketRef.current.on("dashboard:update", () => fetchOrders());

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  /* ---------------- SEARCH & FILTER ---------------- */
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch = `${o.orderId} ${o.customerName}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus = statusFilter === "All" || o.status === statusFilter;
      const matchesPayment = paymentFilter === "All" || o.paymentStatus === paymentFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [orders, search, statusFilter, paymentFilter]);


  const badgeStyle = (value: string) => {
    switch (value) {
      case "Ready":
        return "bg-green-100 text-green-600";
      case "Processing":
      case "SCHEDULED":
      case "PICKUP":
      case "WASHING":
      case "DRYING":
      case "IRONING":
      case "OUT_FOR_DELIVERY":
        return "bg-orange-100 text-orange-600";
      case "Delivered":
      case "DELIVERED":
        return "bg-blue-100 text-blue-600";
      case "Paid":
        return "bg-green-100 text-green-600";
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      case "CANCELLED":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  /* ---------------- HANDLE STATUS CHANGE ---------------- */
  const handleStatusChange = (status: string) => {
    setStatus(status);
    fetchOrders(status);
  };

  /* ---------------- HANDLE SEARCH CHANGE ---------------- */
  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const updatestatus = async (id: string, status: string) => {
    try {
      const res = await api.patch(`/order/${id}/status`,
        { status: status },
      );

      toast.success("Status Updated");

      // update UI manually
      setOrders((prev) =>
        prev.map((order) =>
          order.orderId === id ? { ...order, status: status } : order
        )
      );

    } catch (err) {
      console.error(err);
    }
  }


const exportData = async () => {
  try {
    // Build query string: if status="All", send nothing or All
    const query = status && status !== "All" ? `?status=${status}` : "?status=All";

    const response = await api.get(`/orders/download-excel${query}`, {
      responseType: "blob", // important for Excel download
    });

    // Create a downloadable blob
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "branch-orders.xlsx"); // file name
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error("Export failed", err);
  }
};


  return (
    <div className="p-6">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Orders Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage and track all customer orders
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={()=>exportData()} className="h-10 px-4 rounded-lg border border-gray-200 text-sm hover:bg-gray-50">
            Export
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mb-5">
        <OrderToolbar
          onSearch={handleSearchChange}
          onStatusChange={handleStatusChange}
          onPaymentChange={(payment) => setPaymentFilter(payment)}
        />
      </div>

      {/* Orders Table */}
      <div
        className="bg-white rounded-[14px] border"
        style={{ borderWidth: "1.25px", borderColor: "#E5E7EB", padding: "1.25px" }}
      >
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Items</th>
              <th className="px-4 py-3 text-left">Service Type</th>
              <th className="px-4 py-3 text-left">Pickup Time</th>
              <th className="px-4 py-3 text-left">Delivery Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Payment</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((o) => (
                <tr key={o._id} className="border-t">
                  <td className="px-4 py-3 text-blue-600 font-medium">{o.orderId}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{o.customerName}</p>
                    <p className="text-xs text-gray-400">{o.phone}</p>
                  </td>
                  <td className="px-4 py-3">{o.items}</td>
                  <td className="px-4 py-3">{o.serviceType}</td>
                  <td className="px-4 py-3">{o.pickupTime}</td>
                  <td className="px-4 py-3">{o.deliveryDate}</td>
                  <td className="px-4 py-3">
                    {editingId === o.orderId ? (
                      <select
                        autoFocus
                        value={o.status}  onChange={(e) => {
                      updatestatus(o.orderId, e.target.value);
                  } }
                        className={`px-2 py-1 rounded-full text-xs cursor-pointer outline-none ${badgeStyle(
                          o.status
                        )}`}
                      >
                        {ORDER_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${badgeStyle(o.status)}`}
                      >
                        {o.status}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${badgeStyle(o.paymentStatus)}`}>
                      {o.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium">₹{o.amount.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => setData(o)}>👁</button>
                      <button onClick={() => setEditingId(editingId === o.orderId? null :o.orderId)}><img src={editicon} alt="" /></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center py-4 text-gray-400">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Modal isOpen={!!data} onClose={() => setData(null)}>
          {data && (
            <div>
              <h3 className="text-lg font-bold mb-4">Order Details</h3>

              <p>
                <span className="font-semibold">Order ID:</span> {data.orderId}
              </p>

              <p>
                <span className="font-semibold">Customer:</span> {data.customerName}
              </p>

              <p>
                <span className="font-semibold">Items:</span> {data.items}
              </p>

              <p>
                <span className="font-semibold">Service:</span> {data.serviceType}
              </p>

              <p>
                <span className="font-semibold">Pickup Time:</span> {data.pickupTime}
              </p>

              <p>
                <span className="font-semibold">Delivery Time:</span> {data.deliveryDate}
              </p>

              <p>
                <span className="font-semibold">Status:</span> {data.status}
              </p>

              <p>
                <span className="font-semibold">Amount:</span> ₹{data.amount.toFixed(2)}
              </p>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default OrderManagement;