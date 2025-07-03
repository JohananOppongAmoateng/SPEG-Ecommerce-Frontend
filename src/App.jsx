import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import Layout from "./Layout";
import "./assets/css/app.min.css";
import "./assets/css/fontawesome.min.css";
import "./assets/css/style.css";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { EmailVerification } from "./pages/VerifyEmail";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/orderDetials/[id]";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPasswordPage from "./pages/ForgottenPwd";
import ResetPasswordPage from "./pages/ResetPswd";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Route with Layout wrapping the Homepage */}
          <Route
            path="/"
            element={
              <Layout>
                <Homepage />
              </Layout>
            }
          />
          <Route
            path="/about_us"
            element={
              <Layout>
                <AboutUs />
              </Layout>
            }
          />
          <Route
            path="/contact_us"
            element={
              <Layout>
                <ContactUs />
              </Layout>
            }
          />
          <Route
            path="/shop"
            element={
              <Layout>
                <ProtectedRoute>
                  <Shop />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/verify_email"
            element={
              <Layout>
                <EmailVerification />
              </Layout>
            }
          />
          <Route
            path="/cart"
            element={
              <Layout>
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/orders"
            element={
              <Layout>
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <Layout>
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/checkout"
            element={
              <Layout>
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotten-pwd" element={<ForgotPasswordPage />} />
          <Route path="/resetpwd" element={<ResetPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
