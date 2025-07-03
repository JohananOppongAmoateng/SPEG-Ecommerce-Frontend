import { use } from "react";
import { useCart } from "../context/CartContext";
import prodImage from "../assets/img/photo_2024-10-15_18-40-50.jpg";
import { Link } from "react-router-dom";

function SideCart({ setShowCart }) {
    const { state, dispatch } = useCart();

    const handleRemove = (id) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
    };

    const cartSubtotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <>
            <div className="sidemenu-wrapper sidemenu-cart d-none d-lg-block show">
                <div className="sidemenu-content">
                    <button className="closeButton sideMenuCls">
                        <i
                            className="far fa-times"
                            onClick={() => setShowCart(false)}
                        ></i>
                    </button>
                    <div className="widget woocommerce widget_shopping_cart footer-widget">
                        <h3 className="widget_title">Shopping cart</h3>
                        <div className="widget_shopping_cart_content">
                            <ul className="woocommerce-mini-cart cart_list product_list_widget">
                                {state.cartItems.length === 0 ? (
                                    <div className="ot-cart-wrapper space-top space-extra-bottom">
                                        <div className="container text-center">
                                            <h2 className="text-white">Your Cart is Empty</h2>
                                            <p>
                                                Looks like you haven&apos;t
                                                added any products to your cart
                                                yet.
                                            </p>
                                            <Link to="/shop" className="ot-btn cursor-pointer"  onClick={() => setShowCart(false)}>
                                                Browse Products
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    state.cartItems.map((item, index) => (
                                        <li
                                            className="woocommerce-mini-cart-item mini_cart_item"
                                            key={index}
                                        >
                                            <a
                                               
                                                className="remove remove_from_cart_button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleRemove(item.id);
                                                }}
                                            >
                                                <i className="fal fa-trash-alt"></i>
                                            </a>
                                            <a href="/shop">
                                                <img
                                                    src={prodImage}
                                                    alt="Cart Image"
                                                />
                                                {item.name}
                                            </a>
                                            <span className="quantity">
                                                {item.quantity}×
                                                <span className="woocommerce-Price-amount amount">
                                                    <span className="woocommerce-Price-currencySymbol">
                                                        €
                                                    </span>
                                                    {(
                                                        item.price *
                                                        item.quantity
                                                    )?.toFixed(2)}
                                                </span>
                                            </span>
                                        </li>
                                    ))
                                )}
                            </ul>
                            <p className="woocommerce-mini-cart__total total">
                                <strong>Subtotal:</strong>
                                <span className="woocommerce-Price-amount amount">
                                    <span className="woocommerce-Price-currencySymbol">
                                        €
                                    </span>
                                    {cartSubtotal?.toFixed(2) || 0.0}
                                </span>
                            </p>
                            <p className="woocommerce-mini-cart__buttons buttons">
                                <a
                                    href="/cart"
                                    className="ot-btn style3 wc-forward"
                                >
                                    View cart
                                </a>
                                <a
                                    href="/checkout"
                                    className="ot-btn style3 checkout wc-forward"
                                >
                                    Checkout
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideCart;
