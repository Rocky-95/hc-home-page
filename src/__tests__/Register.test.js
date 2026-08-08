import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "../user/pages/Register";
import authService from "../services/authService";

jest.mock("../services/authService", () => ({ register: jest.fn() }));

describe("Register", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders registration form", () => {
    render(<BrowserRouter><Register /></BrowserRouter>);
    expect(screen.getByPlaceholderText(/enter your full name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your mobile number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/create a strong password/i)).toBeInTheDocument();
  });

  it("keeps submit disabled until all fields and policy are valid", () => {
    render(<BrowserRouter><Register /></BrowserRouter>);
    const btn = screen.getByRole("button", { name: /register/i });
    expect(btn).toBeDisabled();
  });

  it("submits registration when valid", async () => {
    authService.register.mockResolvedValue({ data: { Status: "1" } });
    render(<BrowserRouter><Register /></BrowserRouter>);
    fireEvent.change(screen.getByPlaceholderText(/enter your full name/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your mobile number/i), {
      target: { value: "9876543210" },
    });
    fireEvent.change(screen.getByPlaceholderText(/create a strong password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /register/i }));
    await waitFor(() => expect(authService.register).toHaveBeenCalled());
  });
});
