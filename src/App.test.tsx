/**
 * App Component Tests
 *
 * Basic smoke tests for the application.
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock the Amplify auth module
jest.mock("aws-amplify/auth", () => ({
  signIn: jest.fn(),
  signUp: jest.fn(),
  signOut: jest.fn(),
  confirmSignUp: jest.fn(),
  resendSignUpCode: jest.fn(),
  resetPassword: jest.fn(),
  confirmResetPassword: jest.fn(),
  getCurrentUser: jest.fn().mockRejectedValue(new Error("No user")),
  fetchUserAttributes: jest.fn(),
}));

describe("App", () => {
  test("renders authentication page for unauthenticated users", async () => {
    render(<App />);

    // Should show the login form for unauthenticated users
    const welcomeText = await screen.findByText(/Welcome Back/i);
    expect(welcomeText).toBeInTheDocument();
  });

  test("renders LinkStash branding in logo", async () => {
    render(<App />);

    // Should show the LinkStash logo/brand - use specific class selector
    const brandText = await screen.findByText(/LinkStash/i, {
      selector: ".logo-text",
    });
    expect(brandText).toBeInTheDocument();
  });

  test("renders sign in form elements", async () => {
    render(<App />);

    // Should show email and password fields
    const emailInput = await screen.findByLabelText(/email/i);
    const passwordInput = await screen.findByLabelText(/password/i);
    const signInButton = await screen.findByRole("button", { name: /sign in/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });

  test("renders sign up link for new users", async () => {
    render(<App />);

    // Should show option to sign up
    const signUpLink = await screen.findByRole("button", { name: /sign up/i });
    expect(signUpLink).toBeInTheDocument();
  });
});
