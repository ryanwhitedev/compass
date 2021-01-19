import React from "react";
import { render, screen } from "./testUtils";
import App from "./App";

describe("<App />", () => {
  test("renders landing page if user is not authenticated", () => {
    render(<App />, { initialState: { user: { isAuthenticated: false } } });
    const linkElement = screen.getByText(/login/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders application if user is authenticated", () => {
    render(<App />, {
      initialState: { user: { isAuthenticated: true, username: "test_user" } },
    });
    const menuToggle = screen.getByText(/u\/test_user/i);
    expect(menuToggle).toBeInTheDocument();
  });
});
