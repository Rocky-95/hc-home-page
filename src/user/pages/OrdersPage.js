import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import orderService from "../../services/orderService";
import userService from "../../services/userService";
import "bootstrap/dist/css/bootstrap.min.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [shipmentEvents, setShipmentEvents] = useState([]);
  const [couriers, setCouriers] = useState([]);
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [returnModal, setReturnModal] = useState({ open: false, orderItemId: null, orderId: null });
  const [returnReason, setReturnReason] = useState("");
  const [returnSubmitting, setReturnSubmitting] = useState(false);
  const [returnError, setReturnError] = useState("");
  const [returnSuccess, setReturnSuccess] = useState("");
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  const [cancelError, setCancelError] = useState("");
  const [cancelSuccess, setCancelSuccess] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const [profileRes, ordersRes, itemsRes, statusesRes, shipmentsRes, eventsRes, couriersRes, returnsRes] = await Promise.all([
          userService.getProfile(),
          orderService.getOrders(),
          orderService.getOrderItems(),
          orderService.getOrderStatusHistory(),
          orderService.getShipments(),
          orderService.getShipmentEvents(),
          orderService.getCourierPartners(),
          orderService.getReturns(),
        ]);

        const profile = profileRes.data?.data || profileRes.data;
        const uid = profile?.user_id;

        const allOrders = ordersRes.data?.data || ordersRes.data || [];
        const userOrders = uid ? allOrders.filter((o) => o.user_id === uid) : allOrders;
        setOrders(userOrders.sort((a, b) => new Date(b.order_date || b.created_at) - new Date(a.order_date || a.created_at)));

        setOrderItems(itemsRes.data?.data || itemsRes.data || []);
        setStatuses(statusesRes.data?.data || statusesRes.data || []);
        setShipments(shipmentsRes.data?.data || shipmentsRes.data || []);
        setShipmentEvents(eventsRes.data?.data || eventsRes.data || []);
        setCouriers(couriersRes.data?.data || couriersRes.data || []);
        setReturns(returnsRes.data?.data || returnsRes.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getItemsForOrder = (orderId) => orderItems.filter((item) => item.order_id === orderId);

  const getLatestStatus = (orderId) => {
    const orderStatuses = statuses
      .filter((s) => s.order_id === orderId)
      .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    return orderStatuses[0]?.status_name || "Pending";
  };

  const getShipmentForOrder = (orderId) => shipments.find((s) => s.order_id === orderId);

  const getCourierName = (courierId) => couriers.find((c) => c.courier_partner_id === courierId)?.partner_name || "Courier";

  const getShipmentEvents = (shipmentId) => {
    return shipmentEvents
      .filter((e) => e.shipment_id === shipmentId)
      .sort((a, b) => new Date(b.event_timestamp || b.created_at || 0) - new Date(a.event_timestamp || a.created_at || 0));
  };

  const getReturnForItem = (orderItemId) => {
    return returns.find((r) => r.order_item_id === orderItemId);
  };

  const handleCancelOrder = async (orderId) => {
    setCancellingOrderId(orderId);
    setCancelError("");
    setCancelSuccess("");
    try {
      await orderService.createOrderStatusHistory({
        order_id: orderId,
        order_status_id: statuses.find((s) => s.status_name?.toLowerCase() === "cancelled")?.order_status_id,
        orderstatus: "Cancelled",
        notes: "Cancelled by customer",
        rcu: "website",
      });
      setCancelSuccess("Order cancelled successfully.");
      const refreshed = await orderService.getOrderStatusHistory();
      setStatuses(refreshed.data?.data || refreshed.data || []);
    } catch (err) {
      setCancelError(err.response?.data?.message || "Failed to cancel order.");
    } finally {
      setCancellingOrderId(null);
    }
  };

  const handleReturnSubmit = async (e) => {
    e.preventDefault();
    if (!returnReason.trim()) return;
    setReturnSubmitting(true);
    setReturnError("");
    setReturnSuccess("");
    try {
      const res = await orderService.createReturn({
        order_item_id: returnModal.orderItemId,
        return_reason: returnReason,
        return_status: "requested",
        rcu: "website",
      });
      const newReturn = res.data?.data || res.data;
      setReturns((prev) => [...prev, newReturn]);
      setReturnSuccess("Return request submitted successfully.");
      setReturnReason("");
      setTimeout(() => setReturnModal({ open: false, orderItemId: null, orderId: null }), 1500);
    } catch (err) {
      setReturnError(err.response?.data?.message || "Failed to submit return request.");
    } finally {
      setReturnSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading orders...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>No orders yet</h2>
        <p className="text-muted">Your order history will appear here.</p>
        <Link to="/" className="btn btn-dark mt-3">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Orders</h2>
      {orders.map((order) => {
        const items = getItemsForOrder(order.order_id);
        const status = getLatestStatus(order.order_id);
        const shipment = getShipmentForOrder(order.order_id);
        const events = shipment ? getShipmentEvents(shipment.shipment_id) : [];
        const latestEvent = events[0];
        return (
          <div className="card border-0 shadow-sm mb-4" key={order.order_id}>
            <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
              <div>
                <span className="text-muted">Order</span>
                <h5 className="mb-0">{order.order_number || order.order_id}</h5>
              </div>
              <div className="text-end">
                <span className="text-muted">Placed on</span>
                <p className="mb-0">{formatDate(order.order_date || order.created_at)}</p>
              </div>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="badge bg-dark">{status}</span>
                <div>
                  <span className="badge bg-light text-dark border me-2">{order.payment_status}</span>
                  {status.toLowerCase() === "pending" && (
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleCancelOrder(order.order_id)}
                      disabled={cancellingOrderId === order.order_id}
                    >
                      {cancellingOrderId === order.order_id ? "Cancelling..." : "Cancel Order"}
                    </button>
                  )}
                </div>
              </div>
              {cancelError && cancellingOrderId === order.order_id && (
                <div className="alert alert-danger py-2 mb-3">{cancelError}</div>
              )}
              {cancelSuccess && cancellingOrderId === order.order_id && (
                <div className="alert alert-success py-2 mb-3">{cancelSuccess}</div>
              )}
              {items.length > 0 ? (
                items.map((item) => {
                  const itemReturn = getReturnForItem(item.order_item_id);
                  const isDelivered = status.toLowerCase() === "delivered" || status.toLowerCase() === "completed";
                  return (
                    <div className="row align-items-center mb-3" key={item.order_item_id}>
                      <div className="col-md-8">
                        <h6 className="mb-1">{item.product_name}</h6>
                        <p className="text-muted mb-0">
                          SKU: {item.sku} | Qty: {item.qty}
                        </p>
                        {itemReturn && (
                          <span className="badge bg-warning text-dark mt-1">
                            Return: {itemReturn.return_status}
                          </span>
                        )}
                      </div>
                      <div className="col-md-4 text-md-end">
                        <span className="fw-bold d-block">
                          &#8377;{(item.unit_price * item.qty).toLocaleString("en-IN")}
                        </span>
                        {isDelivered && !itemReturn && (
                          <button
                            className="btn btn-link btn-sm text-decoration-none p-0"
                            onClick={() => {
                              setReturnModal({ open: true, orderItemId: item.order_item_id, orderId: order.order_id });
                              setReturnError("");
                              setReturnSuccess("");
                              setReturnReason("");
                            }}
                          >
                            Request Return
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-muted">No items found for this order.</p>
              )}
              <hr />
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Total Items: {order.total_items || items.length}</span>
                <span className="fw-bold fs-5">
                  Total: &#8377;{(order.total_price || 0).toLocaleString("en-IN")}
                </span>
              </div>

              {shipment ? (
                <div className="bg-light rounded p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0">Shipment Tracking</h6>
                    <span className="badge bg-info text-dark">{getCourierName(shipment.courier_partner_id)}</span>
                  </div>
                  <p className="mb-1">
                    <strong>Tracking Number:</strong> {shipment.tracking_number || "N/A"}
                  </p>
                  <p className="mb-2">
                    <strong>Status:</strong> {latestEvent?.event_status || shipment.shipment_status || "In Transit"}
                  </p>
                  {events.length > 0 && (
                    <div className="mt-2">
                      <strong className="small">Tracking History:</strong>
                      <ul className="list-unstyled small mb-0 mt-1">
                        {events.slice(0, 4).map((event, idx) => (
                          <li key={idx} className="mb-1">
                            <span className="text-muted">{formatDate(event.event_timestamp || event.created_at)}</span>
                            {" — "}
                            {event.event_description || event.event_status}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-muted small">
                  <i className="bi bi-box-seam me-1"></i>
                  Shipping details will appear once the order is dispatched.
                </div>
              )}
            </div>
          </div>
        );
      })}

      {returnModal.open && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Request Return</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setReturnModal({ open: false, orderItemId: null, orderId: null })}
                ></button>
              </div>
              <form onSubmit={handleReturnSubmit}>
                <div className="modal-body">
                  {returnError && <div className="alert alert-danger">{returnError}</div>}
                  {returnSuccess && <div className="alert alert-success">{returnSuccess}</div>}
                  <div className="mb-3">
                    <label className="form-label">Return Reason</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={returnReason}
                      onChange={(e) => setReturnReason(e.target.value)}
                      placeholder="Why are you returning this item?"
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => setReturnModal({ open: false, orderItemId: null, orderId: null })}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-dark" disabled={returnSubmitting}>
                    {returnSubmitting ? "Submitting..." : "Submit Return"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
