import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('renders the MyGlobalTrips luxury homepage', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
    );

    expect(screen.getByText(/Luxury travel planning/i)).toBeInTheDocument();
    expect(screen.getByText(/AI tools section/i)).toBeInTheDocument();
    expect(screen.getByText(/World Tour Packages/i)).toBeInTheDocument();
  });
});
