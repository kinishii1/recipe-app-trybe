import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { favoriteRecipes } from './mocks/formattedData';
import FavoriteRecipes from '../components/FavoriteRecipes';

enum TestIds {
  ALL_BTN = 'filter-by-all-btn',
  MEAL_BTN = 'filter-by-meal-btn',
  DRINK_BTN = 'filter-by-drink-btn',
  FAVORITE_BTN = '0-horizontal-favorite-btn',
  SHARE_BTN = '0-horizontal-share-btn',
}

describe('favorite recipes', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRecipes]));
  });
  afterEach(() => localStorage.clear());
  it('test filter buttons works', async () => {
    render(
      <MemoryRouter>
        <FavoriteRecipes />
      </MemoryRouter>,
    );
    const allButton = screen.getByTestId(TestIds.ALL_BTN);
    const foodButton = screen.getByTestId(TestIds.MEAL_BTN);
    const drinkButton = screen.getByTestId(TestIds.DRINK_BTN);

    await userEvent.click(allButton);
    await userEvent.click(foodButton);
    await userEvent.click(drinkButton);
  });
  it('test dislike buttons works', async () => {
    render(
      <MemoryRouter>
        <FavoriteRecipes />
      </MemoryRouter>,
    );
    const favoriteButton = screen.getByTestId(TestIds.FAVORITE_BTN);
    await userEvent.click(favoriteButton);
  });
  it('test share buttons works', async () => {
    render(
      <MemoryRouter>
        <FavoriteRecipes />
      </MemoryRouter>,
    );
    const shareButton = screen.getByTestId(TestIds.SHARE_BTN);
    await userEvent.click(shareButton);
  });
});

describe('favorite recipes without data', () => {
  it('test without data', async () => {
    render(
      <MemoryRouter>
        <FavoriteRecipes />
      </MemoryRouter>,
    );
    const allButton = screen.getByTestId(TestIds.ALL_BTN);
    const foodButton = screen.getByTestId(TestIds.MEAL_BTN);
    const drinkButton = screen.getByTestId(TestIds.DRINK_BTN);

    await userEvent.click(allButton);
    await userEvent.click(foodButton);
    await userEvent.click(drinkButton);
  });
});
