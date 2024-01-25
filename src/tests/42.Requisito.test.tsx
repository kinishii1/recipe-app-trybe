import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DrinkData, MealData } from './mocks/data';
import RecipeInProgress from '../components/RecipeInProgress';

describe('Recipe in progress Meal', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(MealData),
    } as any);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  afterAll(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });
  it('testing all checkboxes', async () => {
    render(
      <MemoryRouter>
        <RecipeInProgress isDrink={ false } />
      </MemoryRouter>,
    );
    const checkboxes = await screen.findAllByRole('checkbox');
    expect(checkboxes).toHaveLength(13);
    await userEvent.click(checkboxes[0]);
    expect(checkboxes[0]).toBeChecked();
    await userEvent.click(checkboxes[0]);
  });
  it('testing addFavorite button', async () => {
    render(
      <MemoryRouter>
        <RecipeInProgress isDrink={ false } />
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
  it('testing addFavorite button with already favorite', async () => {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([{ id: '52771', type: 'meal' }]),
    );
    render(
      <MemoryRouter>
        <RecipeInProgress isDrink={ false } />
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
  it('testing finish recipe button', async () => {
    render(
      <MemoryRouter>
        <RecipeInProgress isDrink={ false } />
      </MemoryRouter>,
    );
    const allCheckboxes = await screen.findAllByRole('checkbox');
    await Promise.all(
      allCheckboxes.map((checkbox) => userEvent.click(checkbox)),
    );
    const finishBtn = screen.getByTestId('finish-recipe-btn');
    await userEvent.click(finishBtn);
  });
});

describe('Recipe in progress Drink', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(DrinkData),
    } as any);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('testing finish recipe button', async () => {
    render(
      <MemoryRouter>
        <RecipeInProgress isDrink />
      </MemoryRouter>,
    );
    const allCheckboxes = await screen.findAllByRole('checkbox');
    await Promise.all(
      allCheckboxes.map((checkbox) => userEvent.click(checkbox)),
    );
    const finishBtn = screen.getByTestId('finish-recipe-btn');
    await userEvent.click(finishBtn);
  });
});
