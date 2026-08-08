import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

test("renders the home page", async () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const element = await waitFor(() => screen.getByText(/Grand Opening Soon in Trichy & Chennai!/i));
  expect(element).toBeInTheDocument();
});
