import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Meals from '../pages/Meals';

describe('search button', () => {
  it('should render search button', async () => {
    render(
      <MemoryRouter>
        <Meals />
      </MemoryRouter>,
    );
    const searchButton = screen.getByTestId('search-top-btn');
    expect(searchButton).toBeInTheDocument();
    await userEvent.click(searchButton);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    await userEvent.click(searchButton);
    expect(searchInput).not.toBeInTheDocument();
  });
});
