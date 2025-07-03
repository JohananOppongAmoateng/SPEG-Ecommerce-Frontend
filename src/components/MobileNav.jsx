import { useState } from "react";
import logo from "../assets/img/spegpine_logo_no_background.png";

export default function MobileNav ({ setCloseNav }){
    return(
        <div className="ot-menu-wrapper ot-body-visible">
        <div className="ot-menu-area text-center">
          <button className="ot-menu-toggle" onClick={()=>setCloseNav(false)}><i className="fal fa-times"></i></button>
          <div className="mobile-logo">
            <a href="index.html"><img src={logo} alt="SPEG" /></a>
          </div>
          <div className="ot-mobile-menu">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about_us">About Us</a></li>
              <li className="menu-item-has-children">
                <a href="/shop">Products</a>
                <ul className="sub-menu">
                  <li><a href="/shop">Shop</a></li>
                  <li><a href="/cart">Cart</a></li>
                  <li><a href="/checkout">Checkout</a></li>
                  <li><a href="/orders">Orders</a></li>
                </ul>
              </li>
              
              <li><a href="/contact_us">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
}