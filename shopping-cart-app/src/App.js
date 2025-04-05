import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const PRODUCTS = [
    { id: 1, name: "Laptop", price: 500 },
    { id: 2, name: "Smartphone", price: 300 },
    { id: 3, name: "Headphones", price: 100 },
    { id: 4, name: "Smartwatch", price: 150 },
  ];
  
  const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
  const THRESHOLD = 1000;

  // State for product quantities in the product list
  const [productQuantities, setProductQuantities] = useState(
    PRODUCTS.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {})
  );

  // State for cart items
  const [cart, setCart] = useState([]);
  
  // State for notification message
  const [notification, setNotification] = useState('');
  
  // Calculate cart subtotal (excluding free gift)
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      if (item.id !== FREE_GIFT.id) {
        return total + (item.price * item.quantity);
      }
      return total;
    }, 0);
  };

  // Check if free gift should be added or removed
  useEffect(() => {
    const subtotal = calculateSubtotal();
    const hasFreeGift = cart.some(item => item.id === FREE_GIFT.id);
    
    if (subtotal >= THRESHOLD && !hasFreeGift) {
      setCart(prevCart => [...prevCart, { ...FREE_GIFT, quantity: 1 }]);
      setNotification('🎁 Congratulations! A free Wireless Mouse has been added to your cart!');
      setTimeout(() => setNotification(''), 10000);
    } else if (subtotal < THRESHOLD && hasFreeGift) {
      setCart(prevCart => prevCart.filter(item => item.id !== FREE_GIFT.id));
    }
  }, [cart]);

  // Handle quantity change in the product list
  const handleProductQuantityChange = (productId, change) => {
    setProductQuantities(prev => {
      const newValue = Math.max(0, prev[productId] + change);
      return { ...prev, [productId]: newValue };
    });
  };

  // Add product to cart
  const addToCart = (product) => {
    if (productQuantities[product.id] <= 0) return;
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + productQuantities[product.id] } 
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: productQuantities[product.id] }];
      }
    });
    
    // Reset product quantity after adding to cart
    setProductQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  // Update cart item quantity
  const updateCartQuantity = (itemId, change) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item.id === itemId) {
          const newQuantity = Math.max(0, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0 || item.id === FREE_GIFT.id);
      
      return updatedCart;
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    if (itemId === FREE_GIFT.id) return;
    
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const subtotal = calculateSubtotal();
  const progress = Math.min(100, (subtotal / THRESHOLD) * 100);

  return (
    <div className="app-container">
      <h1>Shopping Cart App</h1>
      <div className="products-section">
        <h2>Products</h2>
        <div className="products-grid">
          {PRODUCTS.map(product => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p className="price">${product.price.toFixed(2)}</p>
              
              <div className="quantity-selector">
                <button 
                  onClick={() => handleProductQuantityChange(product.id, -1)}
                  disabled={productQuantities[product.id] <= 0}
                >
                  -
                </button>
                <span>{productQuantities[product.id]}</span>
                <button onClick={() => handleProductQuantityChange(product.id, 1)}>
                  +
                </button>
              </div>
              
              <button 
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
                disabled={productQuantities[product.id] <= 0}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="progress-container">
      <h2>Cart Summary</h2>
        <div className="progress-info">
          <p>Add ${THRESHOLD - subtotal > 0 ? (THRESHOLD - subtotal).toFixed(2) : '0.00'} more to get a free Wireless Mouse!</p>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
      

      
      <div className="cart-section">
        <h2>Cart Items</h2>
        
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className={`cart-item ${item.id === FREE_GIFT.id ? 'free-gift-item' : ''}`}>
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateCartQuantity(item.id, -1)}
                        disabled={item.id === FREE_GIFT.id}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.id, 1)}
                        disabled={item.id === FREE_GIFT.id}
                      >
                        +
                      </button>
                    </div>
                    
                    <p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
                    
                    {item.id !== FREE_GIFT.id && (
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            
            <div className="cart-summary">
              <div className="subtotal">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {cart.some(item => item.id === FREE_GIFT.id) && (
                <div className="free-gift-note">
                  <span>Free Gift:</span>
                  <span>Wireless Mouse</span>
                </div>
              )}
              <div className="total">
                <span>Total:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;