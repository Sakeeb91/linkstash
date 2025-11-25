/**
 * Login Form Component
 *
 * Handles user sign-in with email and password.
 */

import React, { useState, type FormEvent } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onSwitchToForgotPassword: () => void;
  onNeedConfirmation: (email: string) => void;
}

export function LoginForm({
  onSwitchToSignup,
  onSwitchToForgotPassword,
  onNeedConfirmation,
}: LoginFormProps) {
  const { handleSignIn, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      const result = await handleSignIn({ email, password });

      // Check if user needs to confirm their account
      if (result.nextStep?.signInStep === 'CONFIRM_SIGN_UP') {
        onNeedConfirmation(email);
      }
    } catch (err) {
      // Check if the error indicates unconfirmed user
      if (err instanceof Error && err.message.includes('not confirmed')) {
        onNeedConfirmation(email);
      }
      // Error is handled by context
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-title">Welcome Back</h2>
      <p className="auth-subtitle">Sign in to your LinkStash account</p>

      <form onSubmit={handleSubmit} className="auth-form">
        {error && <div className="auth-error">{error}</div>}

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
            autoComplete="current-password"
            disabled={isLoading}
          />
        </div>

        <button type="button" onClick={onSwitchToForgotPassword} className="forgot-password-link">
          Forgot your password?
        </button>

        <button type="submit" className="auth-button primary" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="auth-footer">
        <p>
          Don't have an account?{' '}
          <button type="button" onClick={onSwitchToSignup} className="auth-link">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
