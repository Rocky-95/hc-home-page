import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateCartQty,
    cartTotal,
    loading,
  } = useCart();

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading cart...</span>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Your bag is empty</h2>
        <p className="text-muted">Add items to your cart to see them here.</p>
        <Link to="/" className="btn btn-dark mt-3">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Shopping Bag</h2>
      <div className="row">
        <div className="col-lg-8">
          {cartItems.map((item) => (
            <div className="card mb-3 border-0 shadow-sm" key={item.cart_item_id}>
              <div className="row g-0 align-items-center">
                <div className="col-4 col-md-3">
                  <img
                    src={item.image || "https://via.placeholder.com/150"}
                    alt={item.name}
                    className="img-fluid rounded-start"
                    style={{ objectFit: "cover", height: "120px", width: "100%" }}
                  />
                </div>
                <div className="col-8 col-md-9">
                  <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                    <div>
                      <h5 className="card-title mb-1">{item.name}</h5>
                      <p className="card-text text-muted mb-1">
                        Size: {item.product_variant_id}
                      </p>
                      <p className="card-text fw-bold">
                        &#8377;{(item.unit_price || 0).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
                      <div className="input-group" style={{ width: "120px" }}>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => updateCartQty(item.cart_item_id, (item.qty || 1) - 1)}
                        >
                          -
                        </button>
                        <span className="form-control text-center">{item.qty || 1}</span>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => updateCartQty(item.cart_item_id, (item.qty || 1) + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="btn btn-link text-danger text-decoration-none"
                        onClick={() => removeFromCart(item.cart_item_id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-3">
            <h4 className="mb-3">Order Summary</h4>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>&#8377;{cartTotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold mb-3">
              <span>Total</span>
              <span>&#8377;{cartTotal.toLocaleString("en-IN")}</span>
            </div>
            <Link to="/checkout" className="btn btn-dark w-100">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
