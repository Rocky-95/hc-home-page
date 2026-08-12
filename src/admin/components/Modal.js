import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";

// Shared popup used for every create/edit form in the admin panel — nothing is
// edited inline on the page anymore; a click opens this, and the page behind it
// is inert until it's closed.
const Modal = ({ title, subtitle, onClose, children, size = "md" }) => {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const maxWidth = size === "lg" ? 760 : size === "sm" ? 440 : 580;

  return (
    <div className="admin-modal-backdrop" onMouseDown={onClose}>
      <div
        className="admin-modal-dialog"
        style={{ maxWidth }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="admin-modal-header">
          <div>
            <h5>{title}</h5>
            {subtitle && <div className="admin-modal-subtitle">{subtitle}</div>}
          </div>
          <button type="button" className="admin-modal-close" onClick={onClose} aria-label="Close">
            <FiX size={18} />
          </button>
        </div>
        <div className="admin-modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
