import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
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

describe('PublicRoute', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows loader while authentication state is resolving', () => {
    mockUseAuth.mockReturnValue(createAuthValue({ isLoading: true }));

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <div>Login form</div>
              </PublicRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading experience/i)).toBeInTheDocument();
  });

  it('redirects authenticated users away from public routes', () => {
    mockUseAuth.mockReturnValue(createAuthValue({ isAuthenticated: true }));

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <div>Login form</div>
              </PublicRoute>
            }
          />
          <Route path="/dashboard" element={<div>Dashboard Home</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Dashboard Home/i)).toBeInTheDocument();
  });

  it('renders public content when not authenticated', () => {
    mockUseAuth.mockReturnValue(createAuthValue({ isAuthenticated: false }));

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <div>Login form</div>
              </PublicRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Login form/i)).toBeInTheDocument();
  });
});
