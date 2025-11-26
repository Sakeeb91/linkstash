import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { useAuth } from '../hooks/useAuth';

jest.mock('../hooks/useAuth');

// Mock pages to keep routing tests focused on navigation
jest.mock('../pages/Auth', () => ({ AuthPage: () => <div>Auth Page</div> }));
jest.mock('../pages/Dashboard', () => ({ DashboardPage: () => <div>Dashboard Page</div> }));
jest.mock('../pages/Collections', () => ({
  CollectionsPage: () => <div>Collections Page</div>,
  CollectionDetailPage: () => <div>Collection Detail Page</div>,
}));
jest.mock('../pages/Tags', () => ({
  TagsPage: () => <div>Tags Page</div>,
  TagDetailPage: () => <div>Tag Detail Page</div>,
}));
jest.mock('../pages/Search', () => ({ SearchPage: () => <div>Search Page</div> }));
jest.mock('../pages/Favorites', () => ({ FavoritesPage: () => <div>Favorites Page</div> }));
jest.mock('../pages/Archive', () => ({ ArchivePage: () => <div>Archive Page</div> }));
jest.mock('../pages/Settings', () => ({ SettingsPage: () => <div>Settings Page</div> }));
jest.mock('../pages/NotFound', () => ({ NotFoundPage: () => <div>Not Found</div> }));

type AuthValue = ReturnType<typeof useAuth>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

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

describe('AppRoutes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('redirects protected routes to login when unauthenticated', () => {
    mockUseAuth.mockReturnValue(createAuthValue());

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText(/Auth Page/i)).toBeInTheDocument();
  });

  it('renders protected content when authenticated', () => {
    mockUseAuth.mockReturnValue(createAuthValue({ isAuthenticated: true }));

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText(/Dashboard Page/i)).toBeInTheDocument();
  });

  it('routes home to dashboard when authenticated', () => {
    mockUseAuth.mockReturnValue(createAuthValue({ isAuthenticated: true }));

    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText(/Dashboard Page/i)).toBeInTheDocument();
  });

  it('renders not found for unknown routes', () => {
    mockUseAuth.mockReturnValue(createAuthValue({ isAuthenticated: true }));

    render(
      <MemoryRouter initialEntries={['/missing']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
  });
});
