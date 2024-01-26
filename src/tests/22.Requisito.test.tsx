import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Meals from '../pages/Meals';
import { DrinkCategoriesData, DrinkData, MealCategoriesData, MealData } from './mocks/data';
import App from '../App';

describe('Recipes Meals', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(MealData),
    } as any)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(MealCategoriesData),
      } as any)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(MealData),
      } as any);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('testing click on category', async () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
    const category = await screen.findByTestId('Breakfast-category-filter');
    expect(category).toBeInTheDocument();
    await userEvent.click(category);
    await userEvent.click(category);
  });
});

describe('Recipes Drinks', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(DrinkData),
    } as any)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(DrinkCategoriesData),
      } as any)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(DrinkData),
      } as any);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('testing click on category', async () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <App />
      </MemoryRouter>,
    );
    const category = await screen.findByTestId('Ordinary Drink-category-filter');
    expect(category).toBeInTheDocument();
    await userEvent.click(category);
    await userEvent.click(category);
  });
});
