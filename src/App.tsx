/**
 * LinkStash Application
 *
 * Main application component with routing, authentication, and theming.
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/layout';
import { AuthPage } from './pages/Auth';
import { DashboardPage } from './pages/Dashboard';
import { ROUTES } from './utils/constants';
import './App.css';

/**
 * Main App Component
 *
 * Sets up providers (theme, auth) and routing structure.
 */
function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path={ROUTES.LOGIN} element={<AuthPage />} />
            <Route path={ROUTES.SIGNUP} element={<AuthPage />} />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<AuthPage />} />
            <Route path={ROUTES.CONFIRM_SIGNUP} element={<AuthPage />} />

            {/* Protected Routes */}
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Default redirect */}
            <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} replace />} />

            {/* Catch all - redirect to dashboard */}
            <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
