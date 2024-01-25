import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DoneRecipes from '../components/DoneRecipes';
import { mockDoneDrink, mockDoneMeal } from './mocks/formattedData';

enum TestIds {
  ALL_BTN = 'filter-by-all-btn',
  MEAL_BTN = 'filter-by-meal-btn',
  DRINK_BTN = 'filter-by-drink-btn',
  SHARE_BTN = '0-horizontal-share-btn',
}

describe('done recipes Meals', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify([mockDoneMeal]));
  });

  afterEach(() => localStorage.clear());
  it('test filter buttons works', async () => {
    render(
      <MemoryRouter>
        <DoneRecipes />
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

describe('done recipes drink', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify([mockDoneDrink]));
  });
  afterEach(() => localStorage.clear());
  it('test share button', async () => {
    render(
      <MemoryRouter>
        <DoneRecipes />
      </MemoryRouter>,
    );
    const allButton = screen.getByTestId(TestIds.ALL_BTN);
    const foodButton = screen.getByTestId(TestIds.MEAL_BTN);
    const drinkButton = screen.getByTestId(TestIds.DRINK_BTN);

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
    const shareButton = screen.getByTestId(TestIds.SHARE_BTN);
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
    const allButton = screen.getByTestId(TestIds.ALL_BTN);
    const foodButton = screen.getByTestId(TestIds.MEAL_BTN);
    const drinkButton = screen.getByTestId(TestIds.DRINK_BTN);

    await userEvent.click(allButton);
    await userEvent.click(foodButton);
    await userEvent.click(drinkButton);
  });
});
