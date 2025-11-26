/**
 * Loading State Component
 *
 * Displays a consistent loading indicator across the application.
 */

import React from 'react';
import './LoadingState.css';

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

export function LoadingState({ message = 'Loading...', fullScreen = false }: LoadingStateProps) {
  const containerClass = fullScreen ? 'loading-screen loading-screen--full' : 'loading-screen';

  return (
    <div className={containerClass} role="status" aria-live="polite">
      <div className="loading-screen__spinner" />
      <p className="loading-screen__message">{message}</p>
    </div>
  );
}

export default LoadingState;
