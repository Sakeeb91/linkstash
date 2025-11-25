/**
 * Dashboard Page
 *
 * Main authenticated page showing user's bookmarks and navigation.
 * This is a placeholder that will be expanded in future issues.
 */

import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { APP_NAME } from "../../utils/constants";
import "../../styles/dashboard.css";

export function DashboardPage() {
  const { user, handleSignOut } = useAuth();

  const handleLogout = async () => {
    try {
      await handleSignOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-brand">
          <span className="logo-icon">🔗</span>
          <span className="logo-text">{APP_NAME}</span>
        </div>
        <div className="header-actions">
          <span className="user-email">{user?.email}</span>
          <button onClick={handleLogout} className="logout-button">
            Sign Out
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-welcome">
          <h1>Welcome to {APP_NAME}!</h1>
          <p className="welcome-subtitle">
            {user?.preferredUsername
              ? `Hello, ${user.preferredUsername}!`
              : "Your personal bookmark manager"}
          </p>
        </div>

        <div className="dashboard-content">
          <div className="empty-state">
            <div className="empty-state-icon">📚</div>
            <h2>No bookmarks yet</h2>
            <p>
              Start organizing your web by adding your first bookmark.
              <br />
              Link management features are coming soon!
            </p>
            <div className="coming-soon-features">
              <h3>Coming Soon:</h3>
              <ul>
                <li>📎 Add and manage bookmarks</li>
                <li>🏷️ Tag-based organization</li>
                <li>📁 Collections for grouping links</li>
                <li>🔍 Powerful search functionality</li>
                <li>⭐ Favorites and archives</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="dashboard-footer">
        <p>&copy; 2025 {APP_NAME}. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default DashboardPage;

