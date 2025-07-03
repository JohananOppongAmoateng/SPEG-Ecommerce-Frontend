
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function Layout({ children }) {
    return (
        <>
            <Navbar />

              {/* Main content of the page */}
              <main className="content">{children}</main>

            <Footer />
        </>
    );
}

export default Layout;
