import React, { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { api } from "../../api/axiosInstance";
import Modal from "../Modal/Modal";


type OrderStatus = "Ready" | "Processing" | "Delivered" | "Pending" | "Cancelled";

export interface Order {
  id: string;
  customer: string;
  items: string;
  service: string;
  pickupTime: string;
  status: OrderStatus;
  amount: string;
}

// Map backend statuses to frontend statuses
const mapStatus = (status: string): OrderStatus => {
  switch (status) {
    case "DELIVERED":
      return "Delivered";
    case "SCHEDULED":
    case "PICKUP":
    case "WASHING":
    case "DRYING":
    case "IRONING":
    case "OUT_FOR_DELIVERY":
      return "Processing";
    case "CANCELLED":
      return "Cancelled";
    default:
      return "Pending";
  }
};

const statusStyles: Record<OrderStatus, string> = {
  Ready: "bg-green-100 text-green-700",
  Processing: "bg-orange-100 text-orange-700",
  Delivered: "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

// RecentOrders Component
const RecentOrders: React.FC<{ orders: Order[] }> = ({ orders }) => {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  return (
    <div className="w-full max-w-[1570px] bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-[18px] leading-[28px] font-bold text-[#101828]">
            Recent Orders
          </h2>
          <p className="text-[14px] text-[#6A7282]">Latest order activities</p>
        </div>
        <button className="text-[14px] px-4 py-2 border border-[#0A0A0A] leading-[20px] rounded-lg hover:bg-gray-100 transition">
          View All
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[900px] w-full border-collapse">
          <thead>
            <tr className="text-left text-[14px] font-bold text-[#002F96] border-b">
              <th className="py-3">Order ID</th>
              <th className="py-3">Customer</th>
              <th className="py-3">Items</th>
              <th className="py-3">Service</th>
              <th className="py-3">Pickup Time</th>
              <th className="py-3">Status</th>
              <th className="py-3">Amount</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                <td className="py-4 text-[#155DFC] font-normal text-[14px] leading-[20px] cursor-pointer">
                  {order.id}
                </td>
                <td className="py-4 text-[#101828] font-normal text-[14px] leading-[20px]">
                  {order.customer}
                </td>
                <td className="py-4 text-[#4A5565] font-normal text-[14px] leading-[20px]">
                  {order.items}
                </td>
                <td className="py-4 text-[#4A5565] font-normal text-[14px] leading-[20px]">
                  {order.service}
                </td>
                <td className="py-4 text-[#4A5565] font-normal text-[14px] leading-[20px]">
                  {order.pickupTime}
                </td>
                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-4 font-bold text-[#101828] text-[14px] leading-[20px]">
                  {order.amount}
                </td>
                <td className="py-4">
                  <button onClick={() => setSelectedOrder(order)}  className="text-[#002F96] border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-100 transition">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
           {/* Modal */}
      <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)}>
        {selectedOrder && (
          <div>
            <h3 className="text-lg font-bold mb-4">Order Details</h3>
            <p>
              <span className="font-semibold">Order ID:</span> {selectedOrder.id}
            </p>
            <p>
              <span className="font-semibold">Customer:</span> {selectedOrder.customer}
            </p>
            <p>
              <span className="font-semibold">Items:</span> {selectedOrder.items}
            </p>
            <p>
              <span className="font-semibold">Service:</span> {selectedOrder.service}
            </p>
            <p>
              <span className="font-semibold">Pickup Time:</span> {selectedOrder.pickupTime}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {selectedOrder.status}
            </p>
            <p>
              <span className="font-semibold">Amount:</span> {selectedOrder.amount}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

// RecentOrdersApi Component (with live updates)
const RecentOrdersApi: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const socketRef = useRef<Socket | null>(null);

  const fetchRecentOrders = async () => {
    try {
      const res = await api.get("/dashboard/recent-orders");
      const formatted: Order[] = res.data.data.map((order: any) => ({
        id: order.orderNumber,
        customer: order.customerName,
        items: order.items,
        service: order.service,
        pickupTime: order.pickupTime,
        status: mapStatus(order.status),
        amount: `₹${order.amount}`,
      }));
      setOrders(formatted);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchRecentOrders();

    socketRef.current = io("http://localhost:5001");
    socketRef.current.on("dashboard:update", fetchRecentOrders);

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return <RecentOrders orders={orders} />;
};

export default RecentOrdersApi;