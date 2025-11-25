/**
 * Confirm Signup Component
 *
 * Handles email verification after signup.
 */

import React, { useState, type FormEvent } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface ConfirmSignupProps {
  email: string;
  onConfirmSuccess: () => void;
  onBackToLogin: () => void;
}

export function ConfirmSignup({ email, onConfirmSuccess, onBackToLogin }: ConfirmSignupProps) {
  const { handleConfirmSignUp, handleResendCode, isLoading, error, clearError } = useAuth();
  const [code, setCode] = useState('');
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    setResendMessage(null);

    try {
      await handleConfirmSignUp(email, code);
      onConfirmSuccess();
    } catch {
      // Error is handled by context
    }
  };

  const handleResend = async () => {
    clearError();
    setResendMessage(null);

    try {
      await handleResendCode(email);
      setResendMessage('A new verification code has been sent to your email.');
    } catch {
      // Error is handled by context
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-title">Verify Your Email</h2>
      <p className="auth-subtitle">
        We've sent a verification code to <strong>{email}</strong>
      </p>

      <form onSubmit={handleSubmit} className="auth-form">
        {error && <div className="auth-error">{error}</div>}
        {resendMessage && <div className="auth-success">{resendMessage}</div>}

        <div className="form-group">
          <label htmlFor="code" className="form-label">
            Verification Code
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

        <button type="submit" className="auth-button primary" disabled={isLoading}>
          {isLoading ? 'Verifying...' : 'Verify Email'}
        </button>

        <button
          type="button"
          onClick={handleResend}
          className="auth-button secondary"
          disabled={isLoading}
        >
          Resend Code
        </button>
      </form>

      <div className="auth-footer">
        <p>
          <button type="button" onClick={onBackToLogin} className="auth-link">
            ← Back to sign in
          </button>
        </p>
      </div>
    </div>
  );
}

export default ConfirmSignup;
