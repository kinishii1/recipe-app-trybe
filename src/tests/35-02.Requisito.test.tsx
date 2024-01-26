import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DrinkData, MealData } from './mocks/data';
import RecipeDetails from '../components/RecipeDetails';
import { inProgressRecipes } from './mocks/formattedData';

enum TestIds {
  FAVORITE_BTN = 'favorite-btn',
  START_RECIPE_BTN = 'start-recipe-btn',
  SHARE_BTN = 'share-btn',
}

enum ImageSrc {
  WHITE_HEART = '/src/images/whiteHeartIcon.svg',
  BLACK_HEART = '/src/images/blackHeartIcon.svg',
}

describe('Recipe Details Drinks with inProgressData', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: () => Promise.resolve(DrinkData),
      } as any)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(MealData),
      } as any);
  });
  beforeAll(() => {
    vi.restoreAllMocks();
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify(inProgressRecipes),
    );
  });
  it('testing with isDrink', async () => {
    render(
      <MemoryRouter>
        <RecipeDetails isDrink />
      </MemoryRouter>,
    );

    const favoriteBtn = screen.getByTestId(TestIds.FAVORITE_BTN);
    await userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute(
      'src',
      ImageSrc.BLACK_HEART,
    );
    await userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute(
      'src',
      ImageSrc.WHITE_HEART,
    );
  });
});

describe('Recipe Details Meals with inProgressData', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: () => Promise.resolve(MealData),
      } as any)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(DrinkData),
      } as any);
  });
  beforeAll(() => {
    vi.restoreAllMocks();
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify(inProgressRecipes),
    );
  });
  it('testing without isDrink', async () => {
    render(
      <MemoryRouter>
        <RecipeDetails isDrink={ false } />
      </MemoryRouter>,
    );

    const favoriteBtn = screen.getByTestId(TestIds.FAVORITE_BTN);
    await userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute(
      'src',
      ImageSrc.BLACK_HEART,
    );
    await userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute(
      'src',
      ImageSrc.WHITE_HEART,
    );
  });
});
