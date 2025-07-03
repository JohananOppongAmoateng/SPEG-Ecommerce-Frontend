import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { CartProvider } from "./context/CartContext.jsx";
import { Toaster } from "react-hot-toast";
import LogoLoader from "./components/LogoLoader.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
const App = lazy(() => import("./App.jsx"));

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <CartProvider>
                <Suspense fallback={<LogoLoader />}>
                    <Toaster position="top-right" reverseOrder={false} />
                    <App />
                </Suspense>
            </CartProvider>
        </AuthProvider>
    </StrictMode>
);
