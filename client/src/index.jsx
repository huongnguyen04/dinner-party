import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth0ProviderWithConfig from './auth0Provider.jsx';
import App from './components/App.jsx'

const root = createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Auth0ProviderWithConfig>
      <App />
    </Auth0ProviderWithConfig>
  </Router>
  );