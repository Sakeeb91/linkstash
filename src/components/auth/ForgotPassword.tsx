/**
 * Forgot Password Component
 *
 * Handles password reset flow with email verification.
 */

import React, { useState, type FormEvent } from "react";
import { useAuth } from "../../hooks/useAuth";

interface ForgotPasswordProps {
  onBackToLogin: () => void;
  onResetSuccess: () => void;
}

type ResetStep = "request" | "confirm";

export function ForgotPassword({
  onBackToLogin,
  onResetSuccess,
}: ForgotPasswordProps) {
  const {
    handleForgotPassword,
    handleConfirmResetPassword,
    isLoading,
    error,
    clearError,
  } = useAuth();

  const [step, setStep] = useState<ResetStep>("request");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleRequestSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      await handleForgotPassword(email);
      setStep("confirm");
    } catch {
      // Error is handled by context
    }
  };

  const validatePassword = (): boolean => {
    if (newPassword.length < 8) {
      setValidationError("Password must be at least 8 characters long.");
      return false;
    }
    if (!/[a-z]/.test(newPassword)) {
      setValidationError("Password must contain at least one lowercase letter.");
      return false;
    }
    if (!/[A-Z]/.test(newPassword)) {
      setValidationError("Password must contain at least one uppercase letter.");
      return false;
    }
    if (!/[0-9]/.test(newPassword)) {
      setValidationError("Password must contain at least one number.");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setValidationError("Passwords do not match.");
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleConfirmSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validatePassword()) {
      return;
    }

    try {
      await handleConfirmResetPassword(email, code, newPassword);
      onResetSuccess();
    } catch {
      // Error is handled by context
    }
  };

  const displayError = validationError || error;

  if (step === "request") {
    return (
      <div className="auth-form-container">
        <h2 className="auth-title">Reset Password</h2>
        <p className="auth-subtitle">
          Enter your email and we'll send you a reset code
        </p>

        <form onSubmit={handleRequestSubmit} className="auth-form">
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

          <button
            type="submit"
            className="auth-button primary"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Code"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            <button
              type="button"
              onClick={onBackToLogin}
              className="auth-link"
            >
              ← Back to sign in
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-form-container">
      <h2 className="auth-title">Create New Password</h2>
      <p className="auth-subtitle">
        Enter the code sent to <strong>{email}</strong> and your new password
      </p>

      <form onSubmit={handleConfirmSubmit} className="auth-form">
        {displayError && <div className="auth-error">{displayError}</div>}

        <div className="form-group">
          <label htmlFor="code" className="form-label">
            Reset Code
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="form-input code-input"
            placeholder="Enter 6-digit code"
            required
            autoComplete="one-time-code"
            maxLength={6}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="newPassword" className="form-label">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
          <label htmlFor="confirmNewPassword" className="form-label">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-input"
            placeholder="••••••••"
            required
            autoComplete="new-password"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="auth-button primary"
          disabled={isLoading}
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      <div className="auth-footer">
        <p>
          <button
            type="button"
            onClick={onBackToLogin}
            className="auth-link"
          >
            ← Back to sign in
          </button>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;

