import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from './App';
import { BallotProvider } from './context/BallotContext';

describe('App Component', () => {
  it('renders without crashing and displays header', () => {
    render(
      <BrowserRouter>
        <BallotProvider>
          <App />
        </BallotProvider>
      </BrowserRouter>
    );
    expect(screen.getAllByText(/CivicConnect/i).length).toBeGreaterThan(0);
  });
});
