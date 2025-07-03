import { useState } from "react";
import logo from "../assets/img/spegpine_logo_no_background.png";
import SideCart from "./SideCart";
import { useCart } from "../context/CartContext";
import MobileNav from "./MobileNav";

const Navbar = () => {
    const [showCart, setShowCart] = useState(false);
    const [closeNav, setCloseNav] = useState(false);
    const {state} = useCart()
    return (
        <>
            <header className="ot-header header-layout1">
                <div className="header-top">
                    <div className="container">
                        <div className="row justify-content-center justify-content-lg-between align-items-center gy-2">
                            <div className="col-auto d-none d-lg-block">
                                <div className="header-links">
                                    <ul>
                                        <li className="d-none d-xl-inline-block">
                                            <i className="fal fa-location-dot"></i>
                                            <a href="https://www.google.com/maps?ll=5.602302,-0.200401&z=10&t=m&hl=en-US&gl=US&mapclient=embed&cid=11665919701385738363">
                                                Ampomah House, Olusegun Obasanjo
                                                Highway, Accra
                                            </a>
                                        </li>
                                        <li>
                                            <i className="fal fa-envelope"></i>
                                            <a href="mailto:spegpine@gmail.com">
                                                spegpine@gmail.com
                                            </a>
                                        </li>
                                        <li>
                                            <i className="fal fa-phone-alt"></i>
                                            <a href="tel:+233302244357">
                                                (+233)-302-244357
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sticky-wrapper">
                    <div className="menu-area">
                        <div className="container">
                            <div className="row align-items-center justify-content-between">
                                <div className="col-auto">
                                    <div className="header-logo">
                                        <a href="/">
                                            <img src={logo} alt="SPEG" />
                                        </a>
                                    </div>
                                </div>

                                <div className="col-auto">
                                    <nav className="main-menu d-none d-lg-inline-block">
                                        <ul>
                                            <li>
                                                <a href="/">Home</a>
                                            </li>
                                            <li>
                                                <a href="/about_us">About Us</a>
                                            </li>
                                            <li className="menu-item-has-children">
                                                <a href="#">Products</a>
                                                <ul className="sub-menu">
                                                    <li>
                                                        <a href="/shop">Shop</a>
                                                    </li>
                                                    <li
                                                    >
                                                        <a href="/cart">Cart</a>
                                                    </li>
                                                    <li>
                                                        <a href="/checkout">
                                                            Checkout
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/orders">
                                                            Orders
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="/contact_us">
                                                    Contact Us
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>

                                    <button
                                        type="button"
                                        className="ot-menu-toggle d-block d-lg-none"
                                        onClick={()=> setCloseNav(true)}
                                    >
                                        <i className="far fa-bars"></i>
                                    </button>
                                </div>

                                <div
                                    className="col-auto d-none d-xl-block"
                                   
                                >
                                    <div className="header-button">
                                        {/* <button
                                            type="button"
                                            className="simple-icon searchBoxToggler"
                                        >
                                            <i className="far fa-search"></i>
                                        </button> */}
                                        <button
                                            type="button"
                                            className="simple-icon sideMenuCart"
                                            onClick={()=> setShowCart(!showCart)}
                                        >
                                            <span className="badge">{state.cartItems.length}</span>
                                            <i className="fa-regular fa-cart-shopping"></i>
                                        </button>
                                        <a
                                            href="/shop"
                                            className="ot-btn style4"
                                        >
                                            Get quote
                                            <i className="fas fa-chevrons-right ms-2"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {showCart && <SideCart setShowCart={setShowCart} />}
            {closeNav && <MobileNav setCloseNav={setCloseNav}/>}
        </>
    );
};

export default Navbar;
