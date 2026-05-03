import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import VoterStatusPage from '../src/pages/VoterStatusPage';

describe('VoterStatusPage', () => {
  it('renders the title', () => {
    render(
      <BrowserRouter>
        <VoterStatusPage />
      </BrowserRouter>
    );
    expect(screen.getByText('Voter Status Registration')).toBeInTheDocument();
  });
});
