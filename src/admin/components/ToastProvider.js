import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from "react-icons/fi";

const ToastContext = createContext(null);

const ICONS = { success: FiCheckCircle, error: FiAlertCircle, info: FiInfo };
let uid = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);

  const push = useCallback((type, text) => {
    const id = ++uid;
    setToasts((prev) => [...prev, { id, type, text }]);
    timers.current[id] = setTimeout(() => remove(id), 4200);
  }, [remove]);

  const apiRef = useRef({
    success: (text) => push("success", text),
    error: (text) => push("error", text),
    info: (text) => push("info", text),
  });

  return (
    <ToastContext.Provider value={apiRef.current}>
      {children}
      <div className="admin-toast-stack">
        {toasts.map((t) => {
          const Icon = ICONS[t.type] || FiInfo;
          return (
            <div key={t.id} className={`admin-toast admin-toast-${t.type}`} role="status">
              <Icon size={18} className="admin-toast-icon" />
              <span className="admin-toast-text">{t.text}</span>
              <button className="admin-toast-close" onClick={() => remove(t.id)} aria-label="Dismiss">
                <FiX size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
