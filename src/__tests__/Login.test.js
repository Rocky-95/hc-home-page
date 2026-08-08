import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../user/pages/Login";
import authService from "../services/authService";

jest.mock("../services/authService", () => ({
  passwordLogin: jest.fn(),
  otpLogin: jest.fn(),
  verifyLoginOtp: jest.fn(),
}));

describe("Login", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders password login fields", () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login with password/i })).toBeInTheDocument();
  });

  it("submits password login with entered values", async () => {
    authService.passwordLogin.mockResolvedValue({
      data: { Status: "1", Response: { token: "abc", user: {} } },
    });
    render(<BrowserRouter><Login /></BrowserRouter>);
    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login with password/i }));
    await waitFor(() =>
      expect(authService.passwordLogin).toHaveBeenCalledWith({
        email_id: "test@example.com",
        password: "password",
      })
    );
  });

  it("disables password login button until fields are filled", () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    const btn = screen.getByRole("button", { name: /login with password/i });
    expect(btn).toBeDisabled();
  });
});
