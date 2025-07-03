import { useState, useContext } from "react";
import { useCart } from "../context/CartContext";
import prodImage from "../assets/img/photo_2024-10-15_18-40-50.jpg";
import axiosInstance from "../utils/AxiosInstance";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CheckItems({ setIsModalOpen, isModalOpen }) {
    const { state, dispatch } = useCart();
    const { cartItems } = state;
    const { isAuthenticated, user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const calculateSubtotal = () =>
        cartItems
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toFixed(2);

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            toast.error("Your cart is empty.");
            return;
        }

        if (!isAuthenticated) {
            setIsModalOpen(true);
            toast.error("kindly login to checkout");
            return;
        }

        setIsLoading(true);

        try {
            const payload = {
                farmerId: user.id,
                products: cartItems.map((item) => ({
                    productId: item.id,
                    quantity: item.quantity
                }))
            };

            await axiosInstance.post("/api/orders/create", payload);
            toast.success("Order created successfully!");
            dispatch({
                type: "CLEAR_CART"
            });
            navigate("/orders");
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "An error occurred while processing your order.";
            console.error("Checkout failed:", error);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h4 className="mt-4 pt-lg-2">Your Order</h4>
            <form className="woocommerce-cart-form">
                <table className="cart_table mb-20">
                    <thead>
                        <tr>
                            <th className="cart-col-image">Image</th>
                            <th className="cart-col-productname">
                                Product Name
                            </th>
                            <th className="cart-col-price">Price</th>
                            <th className="cart-col-quantity">Quantity</th>
                            <th className="cart-col-total">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <tr className="cart_item" key={item.id}>
                                    <td data-title="Product">
                                        <img
                                            width="91"
                                            height="91"
                                            src={prodImage}
                                            alt={item.name}
                                        />
                                    </td>
                                    <td data-title="Name">{item.name}</td>
                                    <td data-title="Price">
                                        €{item.price.toFixed(2)}
                                    </td>
                                    <td data-title="Quantity">
                                        {item.quantity}
                                    </td>
                                    <td data-title="Total">
                                        €
                                        {(item.price * item.quantity).toFixed(
                                            2
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center" }}>
                                    Your cart is empty.
                                </td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot className="checkout-ordertable">
                        <tr className="cart-subtotal">
                            <th>Subtotal</th>
                            <td colSpan="4">€{calculateSubtotal()}</td>
                        </tr>
                        <tr className="order-total">
                            <th>Total</th>
                            <td colSpan="4">€{calculateSubtotal()}</td>
                        </tr>
                    </tfoot>
                </table>
            </form>
            <button
                onClick={handleCheckout}
                className="mt-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                disabled={isLoading || cartItems.length === 0}
            >
                {isLoading ? "Processing..." : "Checkout"}
            </button>
        </div>
    );
}

export default CheckItems;
