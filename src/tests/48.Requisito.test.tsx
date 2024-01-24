import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { DrinkData, MealCategoriesData, MealData } from './mocks/data';
import RecipeDetails from '../components/RecipeDetails';
import DoneRecipes from '../components/DoneRecipes';

describe('done recipes Meals', () => {
  beforeEach(() => {
    const mockDataMeal = {
      id: '52977',
      type: 'meal',
      area: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image:
        'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2021',
      tags: ['Pasta', 'Curry'],
    };
    localStorage.setItem('doneRecipes', JSON.stringify([mockDataMeal]));
  });

  afterEach(() => localStorage.clear());
  it('test filter buttons', async () => {
    render(
      <MemoryRouter>
        <DoneRecipes />
      </MemoryRouter>,
    );
    const allButton = screen.getByTestId('filter-by-all-btn');
    const foodButton = screen.getByTestId('filter-by-meal-btn');
    const drinkButton = screen.getByTestId('filter-by-drink-btn');

    await userEvent.click(allButton);
    await userEvent.click(foodButton);
    await userEvent.click(drinkButton);
  });
});

describe('done recipes drink', () => {
  beforeEach(() => {
    const mockDataDrink = {
      id: '15997',
      type: 'drink',
      area: '',
      category: 'Ordinary Drink',
      alcoholicOrNot: 'Optional alcohol',
      name: 'GG',
      image:
        'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      doneDate: '23/06/2021',
      tags: [],
    };
    localStorage.setItem('doneRecipes', JSON.stringify([mockDataDrink]));
  });
  afterEach(() => localStorage.clear());
  it('test share button', async () => {
    render(
      <MemoryRouter>
        <DoneRecipes />
      </MemoryRouter>,
    );
    const allButton = screen.getByTestId('filter-by-all-btn');
    const foodButton = screen.getByTestId('filter-by-meal-btn');
    const drinkButton = screen.getByTestId('filter-by-drink-btn');

    await userEvent.click(allButton);
    await userEvent.click(foodButton);
    await userEvent.click(drinkButton);
  });
  it('test filter buttons', async () => {
    render(
      <MemoryRouter>
        <DoneRecipes />
      </MemoryRouter>,
    );
    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    await userEvent.click(shareButton);
    
  });
});

describe('done recipes without data in localstorage', () => {
  it('test filter buttons', async () => {
    render(
      <MemoryRouter>
        <DoneRecipes />
      </MemoryRouter>,
    );
    const allButton = screen.getByTestId('filter-by-all-btn');
    const foodButton = screen.getByTestId('filter-by-meal-btn');
    const drinkButton = screen.getByTestId('filter-by-drink-btn');

    await userEvent.click(allButton);
    await userEvent.click(foodButton);
    await userEvent.click(drinkButton);
  });
});
