import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Meals from '../pages/Meals';
import { MealCategoriesData, MealData } from './mocks/data';

describe('Recipes', () => {
  vi.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: () => Promise.resolve(MealData),
  } as any)
    .mockResolvedValueOnce({
      json: () => Promise.resolve(MealCategoriesData),
    } as any);
  it('testing click on category', async () => {
    render(
      <MemoryRouter>
        <Meals />
      </MemoryRouter>,
    );
    const category = await screen.findByTestId('Breakfast-category-filter');
    expect(category).toBeInTheDocument();
    await userEvent.click(category);
    await userEvent.click(category);
  });
});
