import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const sampleUsers = {
      Mounika: { password: "admin123", role: "admin" },
      Menaka: { password: "user123", role: "user" },
    };

    const sample = sampleUsers[trimmedEmail];
    if (sample && sample.password === trimmedPassword) {
      const user = {
        id: trimmedEmail === "Mounika" ? 1 : 2,
        full_name: trimmedEmail,
        email_id: trimmedEmail,
        role: sample.role,
      };
      localStorage.setItem("user", JSON.stringify(user));
      navigate(sample.role === "admin" ? "/admin" : "/");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/HARRY-CLINTON/Auth/Password-Login`,
        { email_id: email, password }
      );
      const user = res.data?.data || res.data;
      localStorage.setItem("user", JSON.stringify(user));
      if (user?.role?.toLowerCase() === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
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
        />

        <button style={styles.button}>Send OTP</button>

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
