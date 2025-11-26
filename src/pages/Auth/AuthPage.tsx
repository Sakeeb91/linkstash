/**
 * Authentication Page
 *
 * Container for all authentication forms (login, signup, confirm, forgot password).
 * Handles routing between different auth states.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LoginForm, SignupForm, ConfirmSignup, ForgotPassword } from '../../components/auth';
import { LoadingState } from '../../components/common';
import { ROUTES, APP_NAME } from '../../utils/constants';
import '../../styles/auth.css';

type AuthView = 'login' | 'signup' | 'confirm' | 'forgot-password';

export function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  const [view, setView] = useState<AuthView>('login');
  const [pendingEmail, setPendingEmail] = useState<string>('');

  // Determine initial view based on route
  useEffect(() => {
    const path = location.pathname;
    if (path === ROUTES.SIGNUP) {
      setView('signup');
    } else if (path === ROUTES.FORGOT_PASSWORD) {
      setView('forgot-password');
    } else if (path === ROUTES.CONFIRM_SIGNUP) {
      setView('confirm');
    } else {
      setView('login');
    }
  }, [location.pathname]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const from = (location.state as { from?: Location })?.from?.pathname || ROUTES.DASHBOARD;
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, location.state]);

  // Show loading while checking auth
  if (isLoading) {
    return <LoadingState fullScreen message="Checking your session..." />;
  }

  // Don't render auth forms if already authenticated
  if (isAuthenticated) {
    return null;
  }

  const handleSwitchToSignup = () => {
    setView('signup');
    navigate(ROUTES.SIGNUP);
  };

  const handleSwitchToLogin = () => {
    setView('login');
    navigate(ROUTES.LOGIN);
  };

  const handleSwitchToForgotPassword = () => {
    setView('forgot-password');
    navigate(ROUTES.FORGOT_PASSWORD);
  };

  const handleNeedConfirmation = (email: string) => {
    setPendingEmail(email);
    setView('confirm');
    navigate(ROUTES.CONFIRM_SIGNUP);
  };

  const handleSignupSuccess = (email: string) => {
    setPendingEmail(email);
    setView('confirm');
    navigate(ROUTES.CONFIRM_SIGNUP);
  };

  const handleConfirmSuccess = () => {
    setView('login');
    navigate(ROUTES.LOGIN);
  };

  const handleResetSuccess = () => {
    setView('login');
    navigate(ROUTES.LOGIN);
  };

  const renderForm = () => {
    switch (view) {
      case 'signup':
        return (
          <SignupForm onSwitchToLogin={handleSwitchToLogin} onSignupSuccess={handleSignupSuccess} />
        );
      case 'confirm':
        return (
          <ConfirmSignup
            email={pendingEmail}
            onConfirmSuccess={handleConfirmSuccess}
            onBackToLogin={handleSwitchToLogin}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPassword onBackToLogin={handleSwitchToLogin} onResetSuccess={handleResetSuccess} />
        );
      default:
        return (
          <LoginForm
            onSwitchToSignup={handleSwitchToSignup}
            onSwitchToForgotPassword={handleSwitchToForgotPassword}
            onNeedConfirmation={handleNeedConfirmation}
          />
        );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo">
            <span className="logo-icon">🔗</span>
            <span className="logo-text">{APP_NAME}</span>
          </div>
        </div>
        {renderForm()}
      </div>
      <div className="auth-background">
        <div className="auth-background-pattern" />
      </div>
    </div>
  );
}

export default AuthPage;
