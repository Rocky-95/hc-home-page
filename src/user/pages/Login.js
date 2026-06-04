import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  // 🔥 STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 LOGIN LOGIC
  const handleLogin = () => {
    if (email === "Menaka" && password === "Menaka123@") {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "Menaka",
          role: "user",
        })
      );

      alert("User Login Success");
      navigate("/");
    } else if (email === "Mounika" && password === "Mounika123@") {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "Mounika",
          role: "admin",
        })
      );

      alert("Admin Login Success");
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        {/* OTP (ignore for now) */}
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
          placeholder="Enter your name (Menaka / Mounika)"
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
        <button style={styles.button} onClick={handleLogin}>
          Login with Password
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

/* ✅ ADD THIS (YOU MISSED THIS BEFORE) */
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial",
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

/* ✅ ALSO THIS */
export default Login;