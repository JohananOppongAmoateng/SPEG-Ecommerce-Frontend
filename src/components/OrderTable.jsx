import { useState, useEffect, useContext } from "react";
import {
  ListOrdered,
  User,
  Calendar,
  CheckCircle2,
  Eye,
  Euro,
} from "lucide-react";
import axiosInstance from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Formatter for Euros
  const formatEuros = (amount) => {
    return new Intl.NumberFormat("en-IE", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axiosInstance.get(
          `/api/orders/user/${user?.id}`
        );
        console.log(response.data.orders);
        const sortedOrders = response.data.orders.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sortedOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    }
    fetchOrders();
  }, [user?.id]);

  const handleViewDetails = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-yellow-500 flex items-center">
          <ListOrdered className="mr-2" />
          <span>Loading orders...</span>
        </div>
      </div>
    );
  }

return (
    <div className="w-full px-60 py-8 bg-white">
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 shadow-sm">
            <h1 className="text-2xl font-bold text-green-800 flex items-center">
                <ListOrdered className="mr-3 text-yellow-500" />
                My Orders
            </h1>
        </div>

        {!orders || orders.length === 0 ? (
            <div className="text-center bg-green-50 p-6 rounded-lg shadow-md">
                <p className="text-green-800">No orders found.</p>
            </div>
        ) : (
            <div className="bg-green-50 rounded-lg shadow-md overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-yellow-100">
                        <tr>
                            <th className="p-3 text-left text-green-800 ">
                                <span className="flex items-center">
                                    <ListOrdered className="mr-2 text-yellow-500" />
                                    Order ID
                                </span>
                            </th>
                            <th className="p-3 text-left text-green-800 ">
                                <span className="flex items-center">
                                    <User className="mr-2 text-yellow-500" />
                                    Farmer Name
                                </span>
                            </th>
                            <th className="p-3 text-left text-green-800">
                                <span className="flex items-center">
                                    <Calendar className="mr-2 text-yellow-500" />
                                    Order Date
                                </span>
                            </th>
                            <th className="p-3 text-green-800">
                                <span className="flex items-center">
                                    <Euro className="mr-2 text-yellow-500" />
                                    Total Cost
                                </span>
                            </th>
                            <th className="p-3 text-left text-green-800">
                                <span className="flex items-center">
                                    <CheckCircle2 className="mr-2 text-yellow-500" />
                                    Status
                                </span>
                            </th>
                            <th className="p-3 text-left text-green-800">
                                <span className="flex items-center">
                                    <CheckCircle2 className="mr-2 text-yellow-500" />
                                    Payment Status
                                </span>
                            </th>
                            <th className="p-3 text-left text-green-800">
                                <span className="flex items-center">Pickup Status</span>
                            </th>
                            <th className="p-3 text-left text-green-800">
                                <span className="flex items-center">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr
                                key={order?._id}
                                className="border-b border-green-200 hover:bg-yellow-50 transition-colors"
                            >
                                <td className="p-3 text-green-800 font-semibold">
                                    {order?._id}
                                </td>
                                <td className="p-3 text-green-800">
                                    {order.farmerId.firstName} {order.farmerId.lastName}
                                </td>
                                <td className="p-3 text-green-800">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-3 text-right text-green-800 font-bold">
                                    {formatEuros(order.totalCost)}
                                </td>
                                <td className="p-3">
                                    <span
                                        className={`
                                            px-2 py-1 rounded-full text-xs font-semibold
                                            ${
                                                order.orderStatus === "Completed"
                                                    ? "bg-green-200 text-green-800"
                                                    : order.orderStatus === "Pending"
                                                    ? "bg-yellow-200 text-yellow-800"
                                                    : "bg-red-200 text-red-800"
                                            }
                                        `}
                                    >
                                        {order.orderStatus}
                                    </span>
                                </td>
                                <td className="p-3 text-green-800">
                                    {order.paymentStatus || "Pending"}
                                </td>
                                <td className="p-3 text-green-800">{order.awaitingPickup}</td>
                                <td className="p-3">
                                    <button
                                        onClick={() => handleViewDetails(order._id)}
                                        className="
                                            bg-yellow-500 text-green-800 
                                            hover:bg-yellow-600 
                                            px-3 py-1 rounded 
                                            flex items-center 
                                            transition-colors
                                        "
                                    >
                                        <Eye className="mr-1 w-4 h-4" />
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </div>
);
}

export default OrderTable;
