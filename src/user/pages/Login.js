import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import authService from "../../services/authService";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [otpEmail, setOtpEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpVerifyLoading, setOtpVerifyLoading] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");

  const handleSendOtp = async () => {
    if (!otpEmail.trim()) { setOtpMessage("Enter email or mobile."); return; }
    setOtpLoading(true);
    setOtpMessage("");
    try {
      const res = await authService.otpLogin({ email_id: otpEmail.trim() });
      const payload = res.data || {};
      if (payload.Status === "1" || payload.Status === true || payload.Status === "true") {
        setOtpSent(true);
        setOtpMessage("OTP sent! Check your email.");
      } else {
        setOtpMessage(payload.Message || "Failed to send OTP.");
      }
    } catch (err) {
      setOtpMessage(err.response?.data?.Message || "Failed to send OTP.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpCode.trim()) { setOtpMessage("Enter the OTP."); return; }
    setOtpVerifyLoading(true);
    setOtpMessage("");
    try {
      const res = await authService.verifyLoginOtp({ email_id: otpEmail.trim(), otp: otpCode.trim() });
      const payload = res.data || {};
      const isSuccess = payload.Status === "1" || payload.Status === true || payload.Status === "true";
      if (!isSuccess) { setOtpMessage(payload.Message || "Invalid OTP."); return; }
      const response = payload.Response || {};
      const token = response.token || response.access_token;
      const user = response.user || response;
      const roles = response.roles || user?.roles || [];
      const primaryRole = roles[0] || {};
      const roleCode = primaryRole.role_code || "CUSTOMER";
      if (token) localStorage.setItem("hc_token", token);
      localStorage.setItem("hc_session", "1");
      localStorage.setItem("hc_user", JSON.stringify({ ...user, role_code: roleCode }));
      localStorage.setItem("hc_role", roleCode);
      if (roleCode === "ADMIN") navigate("/admin");
      else navigate(redirectTo || "/");
    } catch (err) {
      setOtpMessage(err.response?.data?.Message || "OTP verification failed.");
    } finally {
      setOtpVerifyLoading(false);
    }
  };

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      const res = await authService.passwordLogin({
        email_id: email.trim(),
        password: password.trim(),
      });
      const payload = res.data || {};
      const isSuccess = payload.Status === "1" || payload.Status === "true" || payload.Status === true;

      if (!isSuccess) {
        setError(payload.Message || "Invalid credentials. Please try again.");
        return;
      }

      const response = payload.Response || {};
      const token = response.token || response.access_token || response.auth_token;
      const user = response.user || response;
      const roles = response.roles || user?.roles || [];

      const primaryRole = roles[0] || {};
      const roleCode = primaryRole.role_code || "CUSTOMER";
      const roleName = primaryRole.role_name || "Customer";
      const normalizedUser = { ...user, role: roleName, role_code: roleCode };

      if (token) {
        localStorage.setItem("hc_token", token);
      }
      // Backend uses cookie/session auth (no JWT). Store a session marker.
      localStorage.setItem("hc_session", "1");
      localStorage.setItem("hc_user", JSON.stringify(normalizedUser));
      localStorage.setItem("hc_role", roleCode);

      if (roleCode === "ADMIN") {
        navigate("/admin");
      } else {
        navigate(redirectTo || "/");
      }
    } catch (err) {
      setError(err.response?.data?.Message || err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        {error && (
          <p style={{ color: "red", fontSize: "14px", marginBottom: "12px", textAlign: "center" }}>
            {error}
          </p>
        )}

        {/* OTP */}
        <label style={styles.label}>Email or Mobile</label>
        <input
          type="text"
          placeholder="Enter email or mobile number"
          style={styles.input}
          value={otpEmail}
          onChange={(e) => setOtpEmail(e.target.value)}
        />
        {otpSent && (
          <>
            <label style={styles.label}>Enter OTP</label>
            <input
              type="text"
              placeholder="Enter OTP from email"
              style={styles.input}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
            />
            <button style={styles.button} onClick={handleVerifyOtp} disabled={otpVerifyLoading}>
              {otpVerifyLoading ? "Verifying..." : "Verify OTP & Login"}
            </button>
          </>
        )}
        {!otpSent && (
          <button style={styles.button} onClick={handleSendOtp} disabled={otpLoading}>
            {otpLoading ? "Sending..." : "Send OTP"}
          </button>
        )}
        {otpMessage && (
          <p style={{ color: otpMessage.includes("sent") ? "green" : "red", fontSize: "13px", marginTop: "6px" }}>{otpMessage}</p>
        )}

        <div style={styles.orBox}>
          <div style={styles.line}></div>
          <span style={styles.orText}>or</span>
          <div style={styles.line}></div>
        </div>

        {/* EMAIL */}
        <label style={styles.label}>Email ID</label>
        <input
          type="text"
          placeholder="Enter your email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <label style={styles.label}>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p style={{ textAlign: "right", marginBottom: "15px", fontSize: "13px" }}>
          <span
            style={{ ...styles.registerLink, fontWeight: "normal" }}
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </span>
        </p>

        {/* LOGIN BUTTON */}
        <button style={styles.button} onClick={handleLogin} disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login with Password"}
        </button>

        <p style={styles.register}>
          Not a user?{" "}
          <span
            style={styles.registerLink}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "MAINLUX, Arial, sans-serif",
    backgroundColor: "#fff",
  },
  card: {
    width: "360px",
    padding: "25px",
    borderRadius: "15px",
    border: "1px solid #ddd",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  label: {
    fontSize: "14px",
    marginBottom: "6px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
  orBox: {
    display: "flex",
    alignItems: "center",
    margin: "20px 0",
  },
  line: {
    flex: 1,
    height: "1px",
    backgroundColor: "#ccc",
  },
  orText: {
    margin: "0 10px",
    fontSize: "14px",
    color: "#777",
  },
  register: {
    textAlign: "center",
    marginTop: "15px",
    fontSize: "14px",
  },
  registerLink: {
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Login;
