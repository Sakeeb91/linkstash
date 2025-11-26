/**
 * LinkStash Application
 *
 * Main application component with routing, authentication, and theming.
 */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { AppRoutes } from './routes';
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
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
