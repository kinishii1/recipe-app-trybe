import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Meals from '../pages/Meals';
import LayoutHeaderWithIcons from '../pages/Layouts/LayoutHeaderWithIcons';

describe('search button', () => {
  it('should render search button', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <LayoutHeaderWithIcons /> }>
            <Route path="meals" element={ <Meals /> } />
          </Route>
        </Routes>
      </BrowserRouter>,
    );
    const searchButton = await screen.findByTestId('search-top-btn');
    expect(searchButton).toBeInTheDocument();
    await userEvent.click(searchButton);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    await userEvent.click(searchButton);
    expect(searchInput).not.toBeInTheDocument();
  });
});
