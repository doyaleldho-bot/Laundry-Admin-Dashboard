import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/axiosInstance";


interface OrderItem {
  title: string;
  quantity: number;
  totalPrice: string;
  serviceType: string[];
}

interface Order {
  orderNumber: number;
  status: string;
  totalAmount: string;
  createdAt: string;
  OrderItems: OrderItem[];
}

const CustomerOrdersPage = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        const res = await api.get(`/customers/${userId}/orders`);
        console.log("Fetched orders:", res.data);
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading)
    return <div className="p-6">Loading orders...</div>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">
        Customer Orders
      </h2>

      {orders.length === 0 && (
        <p className="text-gray-500">
          No orders found.
        </p>
      )}

      {orders.map((order) => (
        <div
          key={order.orderNumber}
          className="bg-white border rounded-xl p-5 shadow-sm"
        >
          <div className="flex justify-between mb-2">
            <div>
              <p className="font-medium">
                Order #{order.orderNumber}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt)
                  .toISOString()
                  .split("T")[0]}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-green-600">
                ₹{order.totalAmount}
              </p>
              <span className="text-sm px-2 py-1 rounded bg-blue-100 text-blue-600">
                {order.status}
              </span>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {order.OrderItems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 p-3 rounded-lg"
              >
                <p className="font-medium">
                  {item.title}
                </p>

                <p className="text-sm text-gray-600">
                  Services:{" "}
                  {item.serviceType.join(", ")}
                </p>

                <p className="text-sm text-gray-600">
                  Qty: {item.quantity}
                </p>

                <p className="text-sm font-semibold">
                  ₹{item.totalPrice}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerOrdersPage;