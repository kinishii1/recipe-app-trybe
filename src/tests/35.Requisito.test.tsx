import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DrinkData, MealData } from './mocks/data';
import RecipeDetails from '../components/RecipeDetails';

enum TestIds {
  FAVORITE_BTN = 'favorite-btn',
  START_RECIPE_BTN = 'start-recipe-btn',
  SHARE_BTN = 'share-btn',
}

enum ImageSrc {
  WHITE_HEART = '/src/images/whiteHeartIcon.svg',
  BLACK_HEART = '/src/images/blackHeartIcon.svg',
}

describe('Recipe Details Meals', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: () => Promise.resolve(MealData),
      } as any)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(DrinkData),
      } as any);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('testing addFavorite', async () => {
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
  it('test start recipe button', async () => {
    const mockData = {
      id: '52977',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image:
        'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    };
    localStorage.setItem('recipe', JSON.stringify(mockData));
    render(
      <MemoryRouter>
        <RecipeDetails isDrink={ false } />
      </MemoryRouter>,
    );

    const startRecipeBtn = screen.getByTestId(TestIds.START_RECIPE_BTN);
    await userEvent.click(startRecipeBtn);
  });
  it('test share button', async () => {
    render(
      <MemoryRouter>
        <RecipeDetails isDrink={ false } />
      </MemoryRouter>,
    );

    const shareBtn = screen.getByTestId(TestIds.SHARE_BTN);
    await userEvent.click(shareBtn);
  });
});

describe('Recipe Details Drinks', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: () => Promise.resolve(DrinkData),
      } as any)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(MealData),
      } as any);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('testing addFavorite', async () => {
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
  it('test start recipe button', async () => {
    render(
      <MemoryRouter>
        <RecipeDetails isDrink />
      </MemoryRouter>,
    );

    const startRecipeBtn = screen.getByTestId(TestIds.START_RECIPE_BTN);
    await userEvent.click(startRecipeBtn);
  });
  it('test share button', async () => {
    render(
      <MemoryRouter>
        <RecipeDetails isDrink />
      </MemoryRouter>,
    );

    const shareBtn = screen.getByTestId(TestIds.SHARE_BTN);
    await userEvent.click(shareBtn);
  });
});
