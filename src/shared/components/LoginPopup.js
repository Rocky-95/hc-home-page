import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ onSkip, onLogin }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    if (onLogin) onLogin();
    navigate("/login");
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome to Harry Clinton</h2>
        <p style={styles.subtitle}>
          Login to enjoy a personalised experience, save addresses, and track your orders.
        </p>
        <button style={styles.loginBtn} onClick={handleLogin}>
          Login / Register
        </button>
        <button style={styles.skipBtn} onClick={onSkip}>
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "36px 28px",
    maxWidth: "380px",
    width: "90%",
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
  },
  title: {
    fontFamily: "MAINLUX, Arial, sans-serif",
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "12px",
    color: "#111",
  },
  subtitle: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "24px",
    lineHeight: "1.6",
  },
  loginBtn: {
    display: "block",
    width: "100%",
    padding: "13px",
    backgroundColor: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "12px",
  },
  skipBtn: {
    display: "block",
    width: "100%",
    padding: "11px",
    backgroundColor: "transparent",
    color: "#555",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default LoginPopup;
