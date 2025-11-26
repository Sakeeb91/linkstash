import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth } from '../../hooks/useAuth';

jest.mock('../../hooks/useAuth');

type AuthValue = ReturnType<typeof useAuth>;

const createAuthValue = (overrides: Partial<AuthValue> = {}): AuthValue =>
  ({
    user: null,
    error: null,
    isAuthenticated: false,
    isLoading: false,
    handleSignIn: jest.fn(),
    handleSignUp: jest.fn(),
    handleSignOut: jest.fn(),
    handleConfirmSignUp: jest.fn(),
    handleResendCode: jest.fn(),
    handleForgotPassword: jest.fn(),
    handleConfirmResetPassword: jest.fn(),
    clearError: jest.fn(),
    ...overrides,
  }) as AuthValue;

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('ProtectedRoute', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows loader while checking authentication state', () => {
    mockUseAuth.mockReturnValue(createAuthValue({ isLoading: true }));

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>Secure</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Checking your session/i)).toBeInTheDocument();
  });

  it('redirects unauthenticated users to login', () => {
    mockUseAuth.mockReturnValue(createAuthValue({ isAuthenticated: false }));

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>Secure</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login screen</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Login screen/i)).toBeInTheDocument();
  });

  it('renders protected content for authenticated users', () => {
    mockUseAuth.mockReturnValue(createAuthValue({ isAuthenticated: true }));

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>Secure</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Secure')).toBeInTheDocument();
  });
});
