import React, { useEffect, useMemo, useState } from "react";
import orderService from "../../services/orderService";
import userService from "../../services/userService";
import { useToast } from "../components/ToastProvider";

const statusOptions = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
const shipmentStatusOptions = ["created", "in_transit", "out_for_delivery", "delivered", "returned"];
const returnStatusOptions = ["requested", "approved", "rejected", "completed"];

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [couriers, setCouriers] = useState([]);
  const [returns, setReturns] = useState([]);
  const [users, setUsers] = useState([]);
  const [statusMaster, setStatusMaster] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const [activeTab, setActiveTab] = useState({}); // orderId -> 'status' | 'shipment' | 'returns'
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, itemsRes, statusesRes, shipmentsRes, couriersRes, returnsRes, usersRes, statusMasterRes] = await Promise.all([
          orderService.getOrders(),
          orderService.getOrderItems(),
          orderService.getOrderStatusHistory(),
          orderService.getShipments(),
          orderService.getCourierPartners(),
          orderService.getReturns(),
          userService.getUsers(),
          orderService.getOrderStatusMaster(),
        ]);
        setOrders(ordersRes.data?.data || ordersRes.data || []);
        setOrderItems(itemsRes.data?.data || itemsRes.data || []);
        setStatuses(statusesRes.data?.data || statusesRes.data || []);
        setShipments(shipmentsRes.data?.data || shipmentsRes.data || []);
        setCouriers(couriersRes.data?.data || couriersRes.data || []);
        setReturns(returnsRes.data?.data || returnsRes.data || []);
        setUsers(usersRes.data?.data || usersRes.data || []);
        setStatusMaster(statusMasterRes.data?.data || statusMasterRes.data || []);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserName = (userId) => {
    const user = users.find((u) => u.user_id === userId || u.id === userId);
    return user?.full_name || user?.email || "Guest";
  };

  const getItemsForOrder = (orderId) => orderItems.filter((item) => item.order_id === orderId);
  const getLatestStatus = (orderId) => {
    const orderStatuses = statuses
      .filter((s) => s.order_id === orderId)
      .sort((a, b) => new Date(b.orderstatustime || 0) - new Date(a.orderstatustime || 0));
    return orderStatuses[0]?.orderstatus || "Pending";
  };
  const getShipmentForOrder = (orderId) => shipments.find((s) => s.order_id === orderId);
  const getReturnsForOrder = (orderId) => returns.filter((r) => r.order_id === orderId);

  const getOrCreateStatus = async (statusName) => {
    const code = statusName.toUpperCase();
    let master = statusMaster;
    let status = master.find(
      (s) => s.status_code?.toUpperCase() === code || s.status_name?.toUpperCase() === code
    );
    if (!status) {
      const res = await orderService.createOrderStatusMaster({
        status_name: statusName,
        status_code: code,
        display_order: master.length + 1,
        iscancelled_status: code === "CANCELLED" ? 1 : 0,
        rcu: "admin",
      });
      status = res.data?.data || res.data;
      if (status) {
        setStatusMaster((prev) => [...prev, status]);
      }
    }
    return status;
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const status = await getOrCreateStatus(newStatus);
      if (!status?.order_status_id) {
        toast.error("Could not resolve order status.");
        return;
      }
      await orderService.createOrderStatusHistory({
        order_id: orderId,
        order_status_id: status.order_status_id,
        orderstatus: newStatus,
        orderstatusby: "admin",
        remarks: `Status updated to ${newStatus}`,
        rcu: "admin",
      });
      const statusesRes = await orderService.getOrderStatusHistory();
      setStatuses(statusesRes.data?.data || statusesRes.data || []);
      toast.success(`Order status updated to ${newStatus}.`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status.");
    }
  };

  const handleCreateShipment = async (e, orderId) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
      order_id: orderId,
      courier_partner_id: form.courier_partner_id.value,
      tracking_number: form.tracking_number.value,
      shipment_status: form.shipment_status.value,
      rcu: "admin",
    };
    try {
      await orderService.createShipment(payload);
      const shipmentsRes = await orderService.getShipments();
      setShipments(shipmentsRes.data?.data || shipmentsRes.data || []);
      toast.success("Shipment created.");
      form.reset();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create shipment.");
    }
  };

  const handleUpdateShipment = async (shipmentId, newStatus) => {
    try {
      await orderService.updateShipment({
        shipment_id: shipmentId,
        shipment_status: newStatus,
        isactive: 1,
        luu: "admin",
      });
      if (newStatus === "delivered") {
        const shipment = shipments.find((s) => s.shipment_id === shipmentId);
        if (shipment) {
          await orderService.createShipmentEvent({
            shipment_id: shipmentId,
            event_status: "Delivered",
            event_description: "Package delivered to customer",
            rcu: "admin",
          });
          // also update order status if not already delivered
          await handleStatusChange(shipment.order_id, "Delivered");
        }
      }
      const shipmentsRes = await orderService.getShipments();
      setShipments(shipmentsRes.data?.data || shipmentsRes.data || []);
      toast.success("Shipment status updated.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update shipment.");
    }
  };

  const handleUpdateReturn = async (returnId, newStatus) => {
    try {
      await orderService.updateReturn({
        return_id: returnId,
        return_status: newStatus,
        isactive: 1,
        luu: "admin",
      });
      const returnsRes = await orderService.getReturns();
      setReturns(returnsRes.data?.data || returnsRes.data || []);
      toast.success(`Return request ${newStatus}.`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update return.");
    }
  };

  const toggleExpand = (orderId) => {
    setExpanded((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
    if (!activeTab[orderId]) setActiveTab((prev) => ({ ...prev, [orderId]: "status" }));
  };

  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => new Date(b.placed_at || 0) - new Date(a.placed_at || 0));
  }, [orders]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading orders...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-4">Order Management</h3>

      {sortedOrders.length === 0 ? (
        <p className="text-muted">No orders found.</p>
      ) : (
        <div className="accordion" id="adminOrdersAccordion">
          {sortedOrders.map((order) => {
            const items = getItemsForOrder(order.order_id);
            const status = getLatestStatus(order.order_id);
            const shipment = getShipmentForOrder(order.order_id);
            const orderReturns = getReturnsForOrder(order.order_id);
            const isExpanded = !!expanded[order.order_id];
            return (
              <div className="accordion-item" key={order.order_id}>
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${isExpanded ? "" : "collapsed"}`}
                    type="button"
                    onClick={() => toggleExpand(order.order_id)}
                  >
                    <div className="d-flex justify-content-between w-100 me-3">
                      <span>
                        <strong>{order.order_number || "Order"}</strong>
                        <span className="text-muted ms-3">{getUserName(order.user_id)}</span>
                      </span>
                      <span>
                        <span className="badge bg-dark me-2">{status}</span>
                        <span className="badge bg-light text-dark border me-2">{order.payment_status}</span>
                        <span className="fw-bold">&#8377;{(order.total_amount || 0).toLocaleString("en-IN")}</span>
                      </span>
                    </div>
                  </button>
                </h2>
                {isExpanded && (
                  <div className="accordion-collapse collapse show">
                    <div className="accordion-body">
                      <ul className="nav nav-tabs mb-3">
                        {[
                          { key: "status", label: "Status" },
                          { key: "items", label: `Items (${items.length})` },
                          { key: "shipment", label: shipment ? "Shipment" : "Create Shipment" },
                          { key: "returns", label: `Returns (${orderReturns.length})` },
                        ].map((tab) => (
                          <li className="nav-item" key={tab.key}>
                            <button
                              className={`nav-link ${activeTab[order.order_id] === tab.key ? "active" : ""}`}
                              onClick={() => setActiveTab((prev) => ({ ...prev, [order.order_id]: tab.key }))}
                            >
                              {tab.label}
                            </button>
                          </li>
                        ))}
                      </ul>

                      {activeTab[order.order_id] === "status" && (
                        <div>
                          <label className="form-label fw-semibold">Update Order Status</label>
                          <select
                            className="form-select w-auto"
                            value={status}
                            onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                          >
                            {statusOptions.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          <div className="mt-3">
                            <strong className="small">Status History:</strong>
                            <ul className="list-unstyled small mt-1">
                              {statuses
                                .filter((s) => s.order_id === order.order_id)
                                .sort((a, b) => new Date(b.orderstatustime || 0) - new Date(a.orderstatustime || 0))
                                .map((s, idx) => (
                                  <li key={idx}>
                                    {new Date(s.orderstatustime || Date.now()).toLocaleString("en-IN")} — {s.orderstatus}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {activeTab[order.order_id] === "items" && (
                        <div>
                          {items.length > 0 ? (
                            <table className="table table-sm">
                              <thead>
                                <tr>
                                  <th>Product</th>
                                  <th>SKU</th>
                                  <th>Qty</th>
                                  <th className="text-end">Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {items.map((item) => (
                                  <tr key={item.order_item_id}>
                                    <td>{item.product_name}</td>
                                    <td>{item.sku}</td>
                                    <td>{item.qty}</td>
                                    <td className="text-end">
                                      &#8377;{(item.unit_price * item.qty).toLocaleString("en-IN")}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <p className="text-muted">No items.</p>
                          )}
                          <div className="d-flex justify-content-between">
                            <span className="text-muted">Subtotal: &#8377;{(order.subtotal || 0).toLocaleString("en-IN")}</span>
                            <span className="text-muted">Tax: &#8377;{(order.tax_amount || 0).toLocaleString("en-IN")}</span>
                            <span className="text-muted">Shipping: &#8377;{(order.shipping_amount || 0).toLocaleString("en-IN")}</span>
                          </div>
                        </div>
                      )}

                      {activeTab[order.order_id] === "shipment" && (
                        <div>
                          {shipment ? (
                            <div>
                              <p className="mb-1">
                                <strong>Tracking Number:</strong> {shipment.tracking_number}
                              </p>
                              <p className="mb-1">
                                <strong>Courier:</strong>{" "}
                                {couriers.find((c) => c.courier_partner_id === shipment.courier_partner_id)?.courier_name || "N/A"}
                              </p>
                              <div className="mb-3">
                                <label className="form-label">Shipment Status</label>
                                <select
                                  className="form-select w-auto"
                                  value={shipment.shipment_status}
                                  onChange={(e) => handleUpdateShipment(shipment.shipment_id, e.target.value)}
                                >
                                  {shipmentStatusOptions.map((s) => (
                                    <option key={s} value={s}>
                                      {s}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          ) : (
                            <form onSubmit={(e) => handleCreateShipment(e, order.order_id)}>
                              <div className="row g-2">
                                <div className="col-md-4">
                                  <select className="form-select" name="courier_partner_id" required>
                                    <option value="">Select Courier</option>
                                    {couriers.map((c) => (
                                      <option key={c.courier_partner_id} value={c.courier_partner_id}>
                                        {c.courier_name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="col-md-4">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="tracking_number"
                                    placeholder="Tracking number"
                                    required
                                  />
                                </div>
                                <div className="col-md-3">
                                  <select className="form-select" name="shipment_status" defaultValue="created" required>
                                    {shipmentStatusOptions.map((s) => (
                                      <option key={s} value={s}>
                                        {s}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="col-md-1">
                                  <button type="submit" className="btn btn-dark w-100">
                                    Save
                                  </button>
                                </div>
                              </div>
                            </form>
                          )}
                        </div>
                      )}

                      {activeTab[order.order_id] === "returns" && (
                        <div>
                          {orderReturns.length > 0 ? (
                            <table className="table table-sm">
                              <thead>
                                <tr>
                                  <th>Item</th>
                                  <th>Reason</th>
                                  <th>Status</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {orderReturns.map((r) => {
                                  const item = orderItems.find((i) => i.order_item_id === r.order_item_id);
                                  return (
                                    <tr key={r.return_id}>
                                      <td>{item?.product_name || "Unknown"}</td>
                                      <td>{r.return_reason}</td>
                                      <td>{r.return_status}</td>
                                      <td>
                                        <select
                                          className="form-select form-select-sm w-auto"
                                          value={r.return_status}
                                          onChange={(e) => handleUpdateReturn(r.return_id, e.target.value)}
                                        >
                                          {returnStatusOptions.map((s) => (
                                            <option key={s} value={s}>
                                              {s}
                                            </option>
                                          ))}
                                        </select>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          ) : (
                            <p className="text-muted">No return requests for this order.</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
