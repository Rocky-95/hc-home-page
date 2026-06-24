import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import orderService from "../../services/orderService";
import userService from "../../services/userService";
import "bootstrap/dist/css/bootstrap.min.css";

const initialAddress = {
  recipient_name: "",
  phone_number: "",
  address_line1: "",
  address_line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "India",
};

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);
  const [address, setAddress] = useState(initialAddress);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profileRes = await userService.getProfile();
        const profile = profileRes.data?.data || profileRes.data;
        if (profile?.user_id) setUserId(profile.user_id);
      } catch {
        // guest checkout stays null
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (cartItems.length === 0 && !success) {
      navigate("/cart");
    }
  }, [cartItems, success, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPlacing(true);

    try {
      const shippingPrice = cartTotal >= 5000 ? 0 : 150;
      const taxAmount = Math.round(cartTotal * 0.05 * 100) / 100;
      const totalPrice = cartTotal + taxAmount + shippingPrice;

      const orderPayload = {
        user_id: userId,
        cart_id: null,
        order_status_id: null,
        order_date: new Date().toISOString(),
        subtotal_price: cartTotal,
        tax_amount: taxAmount,
        shipping_price: shippingPrice,
        total_price: totalPrice,
        payment_status: "pending",
        rcu: "website",
      };

      const orderRes = await orderService.createOrder(orderPayload);
      const order = orderRes.data?.data || orderRes.data;
      const orderId = order?.order_id;

      if (!orderId) {
        throw new Error("Order could not be created.");
      }

      await Promise.all(
        cartItems.map((item) =>
          orderService.createOrderItem({
            order_id: orderId,
            product_id: item.product_id,
            product_variant_id: item.product_variant_id,
            product_name: item.name,
            sku: item.sku || item.product_variant_id,
            qty: item.qty || 1,
            unit_price: item.unit_price || 0,
            rcu: "website",
          })
        )
      );

      await orderService.createOrderAddress({
        order_id: orderId,
        address_type: "shipping",
        ...address,
        rcu: "website",
      });

      await orderService.createPayment({
        order_id: orderId,
        razorpay_order_id: null,
        payment_amount: totalPrice,
        payment_status: "pending",
        payment_method_type: paymentMethod,
        rcu: "website",
      });

      await clearCart();
      setSuccess(true);
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Checkout failed. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (success) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-success">
          <h4 className="alert-heading">Order placed successfully!</h4>
          <p>Thank you for your purchase. You will be redirected shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Checkout</h2>
      <div className="row">
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">Shipping Address</h5>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="recipient_name"
                    className="form-control"
                    value={address.recipient_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone_number"
                    className="form-control"
                    value={address.phone_number}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address Line 1</label>
                  <input
                    type="text"
                    name="address_line1"
                    className="form-control"
                    value={address.address_line1}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address Line 2</label>
                  <input
                    type="text"
                    name="address_line2"
                    className="form-control"
                    value={address.address_line2}
                    onChange={handleChange}
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      value={address.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      name="state"
                      className="form-control"
                      value={address.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Postal Code</label>
                    <input
                      type="text"
                      name="postal_code"
                      className="form-control"
                      value={address.postal_code}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      name="country"
                      className="form-control"
                      value={address.country}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Payment Method</label>
                  <select
                    className="form-select"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="card">Credit / Debit Card</option>
                    <option value="upi">UPI</option>
                    <option value="cod">Cash on Delivery</option>
                    <option value="netbanking">Net Banking</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-dark w-100" disabled={placing}>
                  {placing ? "Placing Order..." : "Place Order"}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm p-3">
            <h5 className="mb-3">Order Summary</h5>
            {cartItems.map((item) => (
              <div className="d-flex justify-content-between mb-2" key={item.cart_item_id}>
                <span>
                  {item.name} x {item.qty || 1}
                </span>
                <span>
                  &#8377;{((item.unit_price || 0) * (item.qty || 1)).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>&#8377;{cartTotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Tax (5%)</span>
              <span>&#8377;{(Math.round(cartTotal * 0.05 * 100) / 100).toLocaleString("en-IN")}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <span>{cartTotal >= 5000 ? "Free" : "₹150"}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span>
                &#8377;
                {(
                  cartTotal +
                  Math.round(cartTotal * 0.05 * 100) / 100 +
                  (cartTotal >= 5000 ? 0 : 150)
                ).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
