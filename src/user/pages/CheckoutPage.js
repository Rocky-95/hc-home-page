import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import orderService from "../../services/orderService";
import userService from "../../services/userService";
import paymentService, { loadRazorpayScript } from "../../services/paymentService";
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
  const { cartItems, cartTotal, discountedTotal, discountAmount, appliedCoupon, clearCart } = useCart();
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [address, setAddress] = useState(initialAddress);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [saveAddress, setSaveAddress] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("hc_user");
    let uid = null;
    let parsedUser = null;
    if (storedUser) {
      try {
        parsedUser = JSON.parse(storedUser);
        uid = parsedUser.user_id || parsedUser.id;
      } catch {
        // ignore
      }
    }
    if (parsedUser) setUser(parsedUser);

    const fetchUserAndAddresses = async () => {
      if (uid) {
        setUserId(uid);
        try {
          const addressesRes = await userService.getAddresses();
          const all = addressesRes.data?.data || addressesRes.data || [];
          const userAddresses = all.filter((a) => a.user_id === uid);
          setSavedAddresses(userAddresses);
          const defaultAddress = userAddresses.find(
            (a) => a.isdefault === 1 || a.isdefault === true
          ) || userAddresses[0];
          if (defaultAddress) {
            setSelectedAddressId(defaultAddress.address_id);
            setAddress({
              recipient_name: defaultAddress.full_name || "",
              phone_number: defaultAddress.mobile_number || "",
              address_line1: defaultAddress.house_street || "",
              address_line2: defaultAddress.landmark || "",
              city: defaultAddress.city || "",
              state: defaultAddress.state || "",
              postal_code: defaultAddress.pincode || "",
              country: "India",
            });
          }
        } catch {
          // ignore
        }
      }
    };
    fetchUserAndAddresses();
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
      const shippingPrice = discountedTotal >= 5000 ? 0 : 150;
      const taxAmount = Math.round(discountedTotal * 0.05 * 100) / 100;
      const totalPrice = discountedTotal + taxAmount + shippingPrice;

      // Ensure a default pending order status exists
      let statusRes = await orderService.getOrderStatusMaster();
      let statuses = statusRes.data?.data || statusRes.data || [];
      let pendingStatus = statuses.find(
        (s) => s.status_code?.toLowerCase() === "pending" || s.status_name?.toLowerCase() === "pending"
      );

      if (!pendingStatus) {
        const createStatusRes = await orderService.createOrderStatusMaster({
          status_name: "Pending",
          status_code: "PENDING",
          status_description: "Order placed, pending processing",
          isactive: 1,
          rcu: "website",
        });
        pendingStatus = createStatusRes.data?.data || createStatusRes.data;
      }

      const orderStatusId = pendingStatus?.order_status_id;
      if (!orderStatusId) {
        throw new Error("Could not resolve order status. Please try again.");
      }

      const orderNumber = `ORD-${Date.now()}`;

      const orderPayload = {
        user_id: userId,
        order_number: orderNumber,
        order_status_id: orderStatusId,
        order_date: new Date().toISOString(),
        subtotal_price: discountedTotal,
        discount_amount: discountAmount || 0,
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
            product_variant_id: item.product_variant_id || null,
            product_name: item.name,
            sku: item.sku || item.product_variant_id || "SKU",
            qty: item.qty || 1,
            unit_price: item.unit_price || 0,
            rcu: "website",
          })
        )
      );

      await orderService.createOrderAddress({
        order_id: orderId,
        address_type: "shipping",
        full_name: address.recipient_name,
        mobile_number: address.phone_number,
        house_street: address.address_line1,
        city: address.city,
        state: address.state,
        pincode: address.postal_code,
        landmark: address.address_line2,
        country: address.country,
        rcu: "website",
      });

      await orderService.createOrderStatusHistory({
        order_id: orderId,
        order_status_id: orderStatusId,
        orderstatus: "Pending",
        notes: "Order placed via website",
        rcu: "website",
      });

      const saveAddressToUser = async () => {
        if (userId && saveAddress && !selectedAddressId) {
          try {
            await userService.createAddress({
              user_id: userId,
              full_name: address.recipient_name,
              mobile_number: address.phone_number,
              emailid: "",
              house_street: address.address_line1,
              city: address.city,
              state: address.state,
              pincode: address.postal_code,
              landmark: address.address_line2,
              country: address.country,
              isdefault: savedAddresses.length === 0 ? 1 : 0,
              isactive: 1,
              rcu: "website",
            });
          } catch (addressErr) {
            console.error("Failed to save address to user account", addressErr);
          }
        }
      };

      const finalizeOrder = async (paymentStatus) => {
        if (paymentStatus === "success") {
          await orderService.updateOrder({
            order_id: orderId,
            payment_status: "success",
            rcu: "website",
          });
        }
        await saveAddressToUser();
        clearCart();
        setSuccess(true);
      };

      if (paymentMethod === "cod") {
        await paymentService.createPayment({
          order_id: orderId,
          user_id: userId,
          amount: totalPrice,
          payment_method: paymentMethod,
          payment_status: "pending",
          payment_date: new Date().toISOString(),
          rcu: "website",
        });
        await finalizeOrder("pending");
        return;
      }

      // Online payment via Razorpay
      let razorpayOrder;
      try {
        const razorpayRes = await paymentService.createRazorpayOrder({
          order_id: orderId,
          amount: Math.round(totalPrice * 100),
          currency: "INR",
          rcu: "website",
        });
        razorpayOrder = razorpayRes.data?.data || razorpayRes.data;
      } catch (err) {
        console.error("Razorpay order creation failed", err);
        setError("Payment provider is not ready. Please try Cash on Delivery or contact support.");
        setPlacing(false);
        return;
      }

      if (!razorpayOrder?.key_id || !razorpayOrder?.order_id) {
        setError("Invalid payment configuration. Please try Cash on Delivery or contact support.");
        setPlacing(false);
        return;
      }

      const Razorpay = await loadRazorpayScript();

      const options = {
        key: razorpayOrder.key_id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency || "INR",
        name: "Harry Clinton",
        description: `Order ${orderNumber}`,
        order_id: razorpayOrder.order_id,
        handler: async (response) => {
          try {
            await paymentService.verifyRazorpayPayment({
              order_id: orderId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              rcu: "website",
            });

            await paymentService.createPayment({
              order_id: orderId,
              user_id: userId,
              amount: totalPrice,
              payment_method: paymentMethod,
              payment_status: "success",
              payment_date: new Date().toISOString(),
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              rcu: "website",
            });

            await finalizeOrder("success");
          } catch (err) {
            setError(err.response?.data?.message || err.message || "Payment verification failed.");
            setPlacing(false);
          }
        },
        prefill: {
          name: address.recipient_name,
          email: user?.email_id || "",
          contact: address.phone_number,
        },
        theme: { color: "#000000" },
        modal: {
          ondismiss: () => {
            setError("Payment was cancelled. You can retry from My Orders.");
            setPlacing(false);
          },
        },
      };

      const rzp = new Razorpay(options);
      rzp.on("payment.failed", (response) => {
        setError(response.error?.description || "Payment failed.");
        setPlacing(false);
      });
      rzp.open();
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
              {savedAddresses.length > 0 && (
                <div className="mb-3">
                  <label className="form-label">Select a saved address</label>
                  <select
                    className="form-select mb-2"
                    value={selectedAddressId}
                    onChange={(e) => {
                      const id = e.target.value;
                      setSelectedAddressId(id);
                      const addr = savedAddresses.find((a) => a.address_id === id);
                      if (addr) {
                        setAddress({
                          recipient_name: addr.full_name || "",
                          phone_number: addr.mobile_number || "",
                          address_line1: addr.house_street || "",
                          address_line2: addr.landmark || "",
                          city: addr.city || "",
                          state: addr.state || "",
                          postal_code: addr.pincode || "",
                          country: "India",
                        });
                      }
                    }}
                  >
                    <option value="">Use a saved address</option>
                    {savedAddresses.map((addr) => (
                      <option value={addr.address_id} key={addr.address_id}>
                        {addr.full_name} — {addr.house_street}, {addr.city}
                      </option>
                    ))}
                  </select>
                </div>
              )}
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
                {userId && (
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="saveAddress"
                      checked={saveAddress}
                      onChange={(e) => setSaveAddress(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="saveAddress">
                      Save this address to my account
                    </label>
                  </div>
                )}
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
            {appliedCoupon && (
              <div className="d-flex justify-content-between mb-2 text-success">
                <span>Discount ({appliedCoupon.code})</span>
                <span>-&#8377;{discountAmount.toLocaleString("en-IN")}</span>
              </div>
            )}
            <div className="d-flex justify-content-between mb-2">
              <span>Tax (5%)</span>
              <span>&#8377;{(Math.round(discountedTotal * 0.05 * 100) / 100).toLocaleString("en-IN")}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <span>{discountedTotal >= 5000 ? "Free" : "₹150"}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span>
                &#8377;
                {(
                  discountedTotal +
                  Math.round(discountedTotal * 0.05 * 100) / 100 +
                  (discountedTotal >= 5000 ? 0 : 150)
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
