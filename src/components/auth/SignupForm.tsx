/**
 * Signup Form Component
 *
 * Handles new user registration with email validation.
 */

import React, { useState, type FormEvent } from "react";
import { useAuth } from "../../hooks/useAuth";

interface SignupFormProps {
  onSwitchToLogin: () => void;
  onSignupSuccess: (email: string) => void;
}

export function SignupForm({ onSwitchToLogin, onSignupSuccess }: SignupFormProps) {
  const { handleSignUp, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [preferredUsername, setPreferredUsername] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const validatePassword = (): boolean => {
    if (password.length < 8) {
      setValidationError("Password must be at least 8 characters long.");
      return false;
    }
    if (!/[a-z]/.test(password)) {
      setValidationError("Password must contain at least one lowercase letter.");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setValidationError("Password must contain at least one uppercase letter.");
      return false;
    }
    if (!/[0-9]/.test(password)) {
      setValidationError("Password must contain at least one number.");
      return false;
    }
    if (password !== confirmPassword) {
      setValidationError("Passwords do not match.");
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validatePassword()) {
      return;
    }

    try {
      const result = await handleSignUp({
        email,
        password,
        preferredUsername: preferredUsername || undefined,
      });

      if (result.nextStep?.signUpStep === "CONFIRM_SIGN_UP") {
        onSignupSuccess(email);
      }
    } catch {
      // Error is handled by context
    }
  };

  const displayError = validationError || error;

  return (
    <div className="auth-form-container">
      <h2 className="auth-title">Create Account</h2>
      <p className="auth-subtitle">Start organizing your bookmarks today</p>

      <form onSubmit={handleSubmit} className="auth-form">
        {displayError && <div className="auth-error">{displayError}</div>}

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            placeholder="you@example.com"
            required
            autoComplete="email"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Display Name{" "}
            <span className="form-label-optional">(optional)</span>
          </label>
          <input
            type="text"
            id="username"
            value={preferredUsername}
            onChange={(e) => setPreferredUsername(e.target.value)}
            className="form-input"
            placeholder="Your display name"
            autoComplete="username"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            placeholder="••••••••"
            required
            autoComplete="new-password"
            disabled={isLoading}
          />
          <p className="form-hint">
            At least 8 characters with uppercase, lowercase, and numbers
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-input"
            placeholder="••••••••"
            required
            autoComplete="new-password"
            disabled={isLoading}
          />
        </div>

        <button type="submit" className="auth-button primary" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <div className="auth-footer">
        <p>
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="auth-link"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;

