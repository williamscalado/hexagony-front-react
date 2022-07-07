import { render, screen } from '@testing-library/react';
import { Footer } from '.';

it('renders open source software message', () => {
  render(<Footer />);
  expect(screen.getByText('Open Source Software')).toBeInTheDocument();
});