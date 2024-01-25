import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DrinkData, MealData } from './mocks/data';
import RecipeDetails from '../components/RecipeDetails';

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

    const favoriteBtn = screen.getByTestId('favorite-btn');
    await userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute(
      'src',
      '/src/images/blackHeartIcon.svg',
    );
    await userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute(
      'src',
      '/src/images/whiteHeartIcon.svg',
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

    const startRecipeBtn = screen.getByTestId('start-recipe-btn');
    await userEvent.click(startRecipeBtn);
  });
  it('test share button', async () => {
    render(
      <MemoryRouter>
        <RecipeDetails isDrink={ false } />
      </MemoryRouter>,
    );

    const shareBtn = screen.getByTestId('share-btn');
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

    const favoriteBtn = screen.getByTestId('favorite-btn');
    await userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute(
      'src',
      '/src/images/blackHeartIcon.svg',
    );
    await userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute(
      'src',
      '/src/images/whiteHeartIcon.svg',
    );
  });
  it('test start recipe button', async () => {
    render(
      <MemoryRouter>
        <RecipeDetails isDrink />
      </MemoryRouter>,
    );

    const startRecipeBtn = screen.getByTestId('start-recipe-btn');
    await userEvent.click(startRecipeBtn);
  });
  it('test share button', async () => {
    render(
      <MemoryRouter>
        <RecipeDetails isDrink />
      </MemoryRouter>,
    );

    const shareBtn = screen.getByTestId('share-btn');
    await userEvent.click(shareBtn);
  });
});
