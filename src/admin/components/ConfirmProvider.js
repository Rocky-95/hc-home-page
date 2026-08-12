import React, { createContext, useCallback, useContext, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";

const ConfirmContext = createContext(null);

// useConfirm() returns an async function: await confirm({ title, message, danger, confirmLabel })
// resolves true/false. Replaces window.confirm with a styled, promise-based modal.
export const ConfirmProvider = ({ children }) => {
  const [state, setState] = useState(null);

  const confirm = useCallback((opts) => {
    return new Promise((resolve) => {
      setState({ ...opts, resolve });
    });
  }, []);

  const handle = (result) => {
    state?.resolve(result);
    setState(null);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {state && (
        <div className="modal show d-block admin-confirm-backdrop" onClick={() => handle(false)}>
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content admin-confirm-dialog">
              <div className="modal-body text-center pt-4 pb-2">
                <div className={`admin-confirm-icon ${state.danger ? "danger" : ""}`}>
                  <FiAlertTriangle size={24} />
                </div>
                <h5 className="mt-3 mb-2">{state.title || "Are you sure?"}</h5>
                {state.message && <p className="text-muted mb-0">{state.message}</p>}
              </div>
              <div className="modal-footer border-0 justify-content-center pb-4 pt-2">
                <button className="btn btn-outline-secondary" onClick={() => handle(false)}>
                  {state.cancelLabel || "Cancel"}
                </button>
                <button className={`btn ${state.danger ? "btn-danger" : "btn-dark"}`} onClick={() => handle(true)} autoFocus>
                  {state.confirmLabel || "Confirm"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => useContext(ConfirmContext);
