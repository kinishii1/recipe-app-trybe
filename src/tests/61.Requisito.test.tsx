import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProfilePage from '../pages/ProfilePage';

describe('profile', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify([{ email: '' }]));
  });
  it('test if doneRecipesButton works', async () => {
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>,
    );
    const doneRecipesButton = screen.getByTestId('profile-done-btn');

    await userEvent.click(doneRecipesButton);
  });
  it('test if favoriteRecipesButton works', async () => {
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>,
    );
    const favoriteRecipesButton = screen.getByTestId('profile-favorite-btn');
    await userEvent.click(favoriteRecipesButton);
  });
  it('test if logoutButton works', async () => {
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>,
    );
    const logoutButton = screen.getByTestId('profile-logout-btn');
    await userEvent.click(logoutButton);
  });
});
