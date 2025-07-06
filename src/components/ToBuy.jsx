import { useState, useEffect } from 'react';
import axiosInstance from '../utils/AxiosInstance';
import prodImage from "../assets/img/photo_2024-10-15_18-40-50.jpg"
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

function ToBuy() {
  // State to hold the list of products and the search input
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { state, dispatch } = useCart();

  const addToCart = (product) => {
    const existingItem = state.cartItems.find((item) => item.id === product.id);
    if (existingItem) {
        toast.success(`Updated quantity for ${product.productName}!`);
    } else {
        toast.success(`Added ${product.productName} to cart!`);
    }

    dispatch({
        type: "ADD_TO_CART",
        payload: {
            id: product.id,
            name: product.productName,
            price: product.sellingPrice,
            imageUrl: product.imageUrl || prodImage,
            quantity: 1,
        },
    });
};

  // Fetch products from an API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/api/products/all"); 
        const data = response.data.product;
        console.log(data);
        const products = data.filter((prod)=>prod.availableStock > 0);
        setProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Update the filtered products whenever the search term changes
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  // Handle search input changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <section className="space-top space-extra-bottom">
      <div className="container">
        {/* Search Input */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        {/* Conditional Rendering */}
        {filteredProducts.length > 0 ? (
          // Product List
          <div className="row gy-30">
            {filteredProducts.map((product) => (
              <div className="col-xl-3 col-lg-4 col-sm-6" key={product.id}>
                <div className="ot-product product-grid">
                  <div className="product-img">
                    {/* Assuming there is no image URL in the data; you may add a default image or omit this if not needed */}
                    <img src={product.image || prodImage} alt={product.productName} />
                    <div className="actions">
                      <a onClick={()=>addToCart(product)} className="icon-btn">
                        <i className="far fa-cart-plus"></i>
                      </a>
                      <a href="#" className="icon-btn">
                        <i className="far fa-heart"></i>
                      </a>
                    </div>
                  </div>
                  <div className="product-content">
                    <h3 className="product-title">
                      <a href="/cart">{product.productName}</a>
                    </h3>
                    <span className="price">€{product.sellingPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // No Products Found Message
          <div className="no-products-message">
            <p>No products found. Please try a different search term.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ToBuy;
