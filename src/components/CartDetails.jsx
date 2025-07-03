import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import prodImage from "../assets/img/photo_2024-10-15_18-40-50.jpg";
import { useState } from "react";

function CartDetails() {
    const { state, dispatch } = useCart();
    const [inputValues, setInputValues] = useState({}); // Local state for input values

    const handleQuantityChange = (id, value) => {
        const parsedValue = Number(value);

        // If empty or invalid, update local state only
        if (value === "" || isNaN(parsedValue)) {
            setInputValues((prev) => ({ ...prev, [id]: value }));
            return;
        }

        // Remove item if quantity is explicitly less than 1
        if (parsedValue < 1) {
            dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
            setInputValues((prev) => ({ ...prev, [id]: undefined }));
            return;
        }

        // Update cart with valid quantity
        dispatch({
            type: "UPDATE_CART_QUANTITY",
            payload: { id, quantity: parsedValue },
        });
        setInputValues((prev) => ({ ...prev, [id]: parsedValue }));
    };

    const handleBlur = (id, value) => {
        const parsedValue = Number(value);
        const currentItem = state.cartItems.find((item) => item.id === id);
        if (value === "" || isNaN(parsedValue) || parsedValue < 1) {
            // Reset to current cart quantity if invalid
            setInputValues((prev) => ({
                ...prev,
                [id]: currentItem?.quantity || 1,
            }));
        }
    };

    const handleRemove = (id) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
        setInputValues((prev) => ({ ...prev, [id]: undefined }));
    };

    const cartSubtotal = state.cartItems.reduce(
        (total, item) => total + (item.price || 0) * (item.quantity || 0),
        0
    );

    if (!state.cartItems || state.cartItems.length === 0) {
        return (
            <div className="ot-cart-wrapper space-top space-extra-bottom">
                <div className="container text-center">
                    <h2>Your Cart is Empty</h2>
                    <p>
                        Looks like you haven&apos;t added any products to your cart
                        yet.
                    </p>
                    <Link to="/shop" className="ot-btn">
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="ot-cart-wrapper space-top space-extra-bottom">
            <div className="container">
                <form
                    className="woocommerce-cart-form"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <table className="cart_table">
                        <thead>
                            <tr>
                                <th className="cart-col-image">Image</th>
                                <th className="cart-col-productname">
                                    Product Name
                                </th>
                                <th className="cart-col-price">Price</th>
                                <th className="cart-col-quantity">Quantity</th>
                                <th className="cart-col-total">Total</th>
                                <th className="cart-col-remove">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.cartItems.map((item) => (
                                <tr className="cart_item" key={item.id}>
                                    <td data-title="Product">
                                        <a
                                            href={item.url || "#"}
                                            className="cart-productimage"
                                        >
                                            <img
                                                width="91"
                                                height="91"
                                                src={prodImage}
                                                alt={item.name || "Product"}
                                            />
                                        </a>
                                    </td>
                                    <td data-title="Name">
                                        <a
                                            href={item.url || "#"}
                                            className="cart-productname"
                                        >
                                            {item.name || "Unnamed Product"}
                                        </a>
                                    </td>
                                    <td data-title="Price">
                                        <span className="amount">
                                            €{(item.price || 0).toFixed(2)}
                                        </span>
                                    </td>
                                    <td data-title="Quantity">
                                        <div className="quantity">
                                
                                            <input
                                                type="number"
                                                className="qty-input"
                                                value={
                                                    inputValues[item.id] !==
                                                    undefined
                                                        ? inputValues[item.id]
                                                        : item.quantity || 0
                                                }
                                                min="1"
                                                onChange={(e) =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        e.target.value
                                                    )
                                                }
                                                onBlur={(e) =>
                                                    handleBlur(
                                                        item.id,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            
                                        </div>
                                    </td>
                                    <td data-title="Total">
                                        <span className="amount">
                                            €
                                            {(
                                                (item.price || 0) *
                                                (item.quantity || 0)
                                            ).toFixed(2)}
                                        </span>
                                    </td>
                                    <td data-title="Remove">
                                        <button
                                            type="button"
                                            className="remove"
                                            onClick={() =>
                                                handleRemove(item.id)
                                            }
                                        >
                                            <i className="fal fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="6" className="actions">
                                    <button
                                        type="button"
                                        className="ot-btn"
                                        onClick={() =>
                                            dispatch({ type: "CLEAR_CART" })
                                        }
                                    >
                                        Clear Cart
                                    </button>
                                    <Link to="/shop" className="ot-btn">
                                        Continue Shopping
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <div className="row justify-content-end">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <h2 className="h4 summary-title">Cart Totals</h2>
                        <table className="cart_totals">
                            <tbody>
                                <tr>
                                    <td>Cart Subtotal</td>
                                    <td data-title="Cart Subtotal">
                                        <span className="amount">
                                            €{cartSubtotal.toFixed(2)}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr className="order-total">
                                    <td>Order Total</td>
                                    <td data-title="Total">
                                        <strong>
                                            <span className="amount">
                                                €{cartSubtotal.toFixed(2)}
                                            </span>
                                        </strong>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        <div className="wc-proceed-to-checkout mb-30">
                            <Link to="/checkout" className="ot-btn">
                                Proceed to checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartDetails;