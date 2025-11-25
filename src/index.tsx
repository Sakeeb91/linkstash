import React from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import amplifyConfig from './amplifyconfiguration';

/**
 * Configure Amplify with backend outputs
 *
 * The configuration is loaded from amplifyconfiguration.ts
 * After running `npm run sandbox`, update that file with the
 * actual outputs from amplify_outputs.json
 */
if (Object.keys(amplifyConfig).length > 0) {
  try {
    Amplify.configure(amplifyConfig as Parameters<typeof Amplify.configure>[0]);
    // Amplify configured successfully
  } catch (error) {
    console.warn('Failed to configure Amplify:', error);
  }
} else {
  console.warn(
    "Amplify not configured. Run 'npm run sandbox' and update src/amplifyconfiguration.ts"
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
