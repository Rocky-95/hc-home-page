import React, { useState } from "react";

// Click-to-flip Active/Inactive switch for table rows — lets staff toggle a record's
// status directly from the list without opening the edit form just to flip one checkbox.
const ActiveToggle = ({ active, onToggle, disabled }) => {
  const [busy, setBusy] = useState(false);

  const handleClick = async (e) => {
    e.stopPropagation();
    if (busy || disabled) return;
    setBusy(true);
    try {
      await onToggle(!active);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      className={`admin-toggle-switch ${active ? "is-on" : ""}`}
      onClick={handleClick}
      disabled={busy || disabled}
      aria-pressed={active}
      title={active ? "Active — click to deactivate" : "Inactive — click to activate"}
    >
      <span className="admin-toggle-knob" />
    </button>
  );
};

export default ActiveToggle;
