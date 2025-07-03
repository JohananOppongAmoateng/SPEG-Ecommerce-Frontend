import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Package,
    UserCircle,
    DollarSign,
    CheckCircle2,
    ListOrdered,
    Euro,
    FileText
} from "lucide-react";
import axiosInstance from "../../utils/AxiosInstance";
import Breadcrumb from "../../components/Breadcrumb";
import toast from "react-hot-toast";

function OrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const getInvoiceUrl = (invoiceId) => {
        return `http://localhost:3020/api/invoices/files/invoice_${invoiceId}.pdf`;
      };

    useEffect(() => {
        async function fetchOrderDetails() {
            try {
                const response = await axiosInstance.get(`/api/orders/${id}`);
                // Notify the user if the order is approved
                if (response.data.order.orderStatus.toLowerCase() === "approved") {
                    toast.success(
                        "Order has been approved. Check your email for the invoice."
                    );
                }
                setOrder(response.data.order);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching order details:", error);
                setLoading(false);
            }
        }
        fetchOrderDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-pulse text-yellow-500 flex items-center">
                    <Package className="mr-2" />
                    <span>Loading order details...</span>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                Order not found.
            </div>
        );
    }

    return (
        <div>
            <Breadcrumb pageName="Order Details" />
            <div className="container mx-auto px-4 py-8 bg-white">
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 shadow-sm">
                    <h1 className="text-2xl font-bold text-green-800 flex items-center">
                        <Package className="mr-3 text-yellow-500" />
                        Order Details
                    </h1>
                </div>

                <div className="grid md:grid-cols-2 gap-6 bg-green-50 p-6 rounded-lg shadow-md">
                    <div>
                        <div className="flex items-center mb-3">
                            <UserCircle className="mr-2 text-yellow-500" />
                            <p className="font-semibold text-green-800 m-0">
                                Farmer: {order.farmerId.firstName}{" "}
                                {order.farmerId.lastName}
                            </p>
                        </div>

                        <div className="flex items-center mb-3">
                            <Euro className="mr-2 text-yellow-500" />
                            <p className="font-semibold text-green-800 m-0">
                                Total Cost: €{order.totalCost.toFixed(2)}
                            </p>
                        </div>

                        <div className="flex items-center">
                            <CheckCircle2 className="mr-2 text-yellow-500 justify-center" />
                            <p className="font-semibold text-green-800 m-0">
                                Status: {order.orderStatus}
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-lg font-bold mb-3 text-green-800 flex items-center">
                            <ListOrdered className="mr-2 text-yellow-500" />
                            Order ID: {order._id}
                        </p>
                        {order.invoiceGenerated && (
                            <a
                                href={getInvoiceUrl(order.invoiceId)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition"
                            >
                                <FileText className="mr-2" />
                                View Invoice
                            </a>
                        )}
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4 text-green-800 border-b-2 border-yellow-500 pb-2">
                        Products
                    </h2>
                    <div className="bg-green-50 rounded-lg overflow-hidden shadow-md">
                        <table className="w-full">
                            <thead className="bg-yellow-100">
                                <tr>
                                    <th className="p-3 text-left text-green-800">
                                        Product
                                    </th>
                                    <th className="p-3 text-left text-green-800">
                                        Quantity
                                    </th>
                                    <th className="p-3 text-left text-green-800">
                                        Unit Price
                                    </th>
                                    <th className="p-3 text-left text-green-800">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.products.map((product) => (
                                    <tr
                                        key={product.productId}
                                        className="border-b border-green-200 hover:bg-yellow-50 transition-colors"
                                    >
                                        <td className="p-3 text-green-800">
                                            {product.productName}
                                        </td>
                                        <td className="p-3 text-green-800">
                                            {product.quantity}
                                        </td>
                                        <td className="p-3 text-green-800">
                                            €{product.unitPrice.toFixed(2)}
                                        </td>
                                        <td className="p-3 text-green-800 font-semibold">
                                            €{product.cost.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
