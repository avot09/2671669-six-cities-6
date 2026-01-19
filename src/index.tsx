import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import { mockOffers, mockReviews } from './mocks';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={mockOffers} reviews={mockReviews} />
  </React.StrictMode>
);

