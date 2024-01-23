import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';

enum TestIds {
  SEARCH_TOP_BTN = 'search-top-btn',
  SEARCH_INPUT = 'search-input',
  EXEC_SEARCH_BTN = 'exec-search-btn',
}

describe('Meals', () => {
  const fetchMockMeals = vi.spyOn(global, 'fetch').mockResolvedValue({
    json: () => Promise.resolve(JSON.stringify({ meals: [{ idMeal: '1' }] })),
  } as any);
  afterEach(() => {
    fetchMockMeals.mockRestore();
  });
  it('renders correctly', async () => {
    render(
      <BrowserRouter>
        <Meals />
      </BrowserRouter>,
    );
    const searchButton = screen.getByTestId(TestIds.SEARCH_TOP_BTN);
    await userEvent.click(searchButton);

    const radios = screen.getAllByRole('radio');
    expect(radios.length).toBe(3);

    radios.forEach(async (radio) => {
      await userEvent.click(radio);
    });

    const execButton = screen.getByTestId(TestIds.EXEC_SEARCH_BTN);
    expect(execButton).toBeInTheDocument();
    await userEvent.click(execButton);
  });
  it('should call the meals api with ingredients', async () => {
    render(
      <BrowserRouter>
        <Meals />
      </BrowserRouter>,
    );

    const searchButton = screen.getByTestId(TestIds.SEARCH_TOP_BTN);
    await userEvent.click(searchButton);

    const radios = screen.getAllByRole('radio');
    await userEvent.click(radios[0]);

    const inputText = screen.getByTestId(TestIds.SEARCH_INPUT);
    await userEvent.type(inputText, 'test');

    const execButton = screen.getByTestId(TestIds.EXEC_SEARCH_BTN);
    await userEvent.click(execButton);
  });

  it('should call the Meal api with name', async () => {
    render(
      <BrowserRouter>
        <Meals />
      </BrowserRouter>,
    );
    const searchButton = screen.getByTestId(TestIds.SEARCH_TOP_BTN);
    await userEvent.click(searchButton);

    const radios = screen.getAllByRole('radio');
    await userEvent.click(radios[1]);

    const inputText = screen.getByTestId(TestIds.SEARCH_INPUT);
    await userEvent.type(inputText, 't');

    const execButton = screen.getByTestId(TestIds.EXEC_SEARCH_BTN);
    await userEvent.click(execButton);
  });
  it('should call the Meal api with first letter', async () => {
    render(
      <BrowserRouter>
        <Meals />
      </BrowserRouter>,
    );

    const searchButton = screen.getByTestId(TestIds.SEARCH_TOP_BTN);
    await userEvent.click(searchButton);

    const radios = screen.getAllByRole('radio');
    await userEvent.click(radios[2]);

    const inputText = screen.getByTestId(TestIds.SEARCH_INPUT);
    await userEvent.type(inputText, 't');

    const execButton = screen.getByTestId(TestIds.EXEC_SEARCH_BTN);
    await userEvent.click(execButton);
  });
  it('if find 1 meal recipe should redirect to details page', async () => {
    render(
      <BrowserRouter>
        <Meals />
      </BrowserRouter>,
    );
    fetchMockMeals.mockRestore();
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({ meals: [{ idMeal: '1' }] }),
    } as any);
    const searchButton = screen.getByTestId(TestIds.SEARCH_TOP_BTN);
    await userEvent.click(searchButton);

    const radios = screen.getAllByRole('radio');
    await userEvent.click(radios[2]);

    const inputText = screen.getByTestId(TestIds.SEARCH_INPUT);
    await userEvent.type(inputText, 't');

    const execButton = screen.getByTestId(TestIds.EXEC_SEARCH_BTN);
    await userEvent.click(execButton);
  });
});

describe('Drinks', () => {
  const fetchMockDrinks = vi.spyOn(global, 'fetch').mockResolvedValue({
    json: () => Promise.resolve(JSON.stringify({ drinks: [{ idDrink: '1' }] })),
  } as any);
  afterEach(() => {
    fetchMockDrinks.mockRestore();
  });
  it('should call the drinks api with ingredients', async () => {
    render(
      <BrowserRouter>
        <Drinks />
      </BrowserRouter>,
    );

    const searchButton = screen.getByTestId(TestIds.SEARCH_TOP_BTN);
    await userEvent.click(searchButton);

    const radios = screen.getAllByRole('radio');
    await userEvent.click(radios[0]);

    const inputText = screen.getByTestId(TestIds.SEARCH_INPUT);
    await userEvent.type(inputText, 'a');

    const execButton = screen.getByTestId(TestIds.EXEC_SEARCH_BTN);
    await userEvent.click(execButton);
  });

  it('should call the drinks api with name', async () => {
    render(
      <BrowserRouter>
        <Drinks />
      </BrowserRouter>,
    );

    const searchButton = screen.getByTestId(TestIds.SEARCH_TOP_BTN);
    await userEvent.click(searchButton);

    const radios = screen.getAllByRole('radio');
    await userEvent.click(radios[1]);

    const inputText = screen.getByTestId(TestIds.SEARCH_INPUT);
    await userEvent.type(inputText, 'b');

    const execButton = screen.getByTestId(TestIds.EXEC_SEARCH_BTN);
    await userEvent.click(execButton);
  });
  it('should call the drinks api with first letter', async () => {
    render(
      <BrowserRouter>
        <Drinks />
      </BrowserRouter>,
    );

    const searchButton = screen.getByTestId(TestIds.SEARCH_TOP_BTN);
    await userEvent.click(searchButton);

    const radios = screen.getAllByRole('radio');
    await userEvent.click(radios[2]);

    const inputText = screen.getByTestId(TestIds.SEARCH_INPUT);
    await userEvent.type(inputText, 't');

    const execButton = screen.getByTestId(TestIds.EXEC_SEARCH_BTN);
    await userEvent.click(execButton);
  });
  it('should call the drinks api with first letter', async () => {
    render(
      <BrowserRouter>
        <Drinks />
      </BrowserRouter>,
    );

    const searchButton = screen.getByTestId(TestIds.SEARCH_TOP_BTN);
    await userEvent.click(searchButton);

    const radios = screen.getAllByRole('radio');
    await userEvent.click(radios[2]);

    const inputText = screen.getByTestId(TestIds.SEARCH_INPUT);
    await userEvent.type(inputText, 't');

    const execButton = screen.getByTestId(TestIds.EXEC_SEARCH_BTN);
    await userEvent.click(execButton);
  });
  it('if find 1 drink recipe should redirect to details page', async () => {
    render(
      <BrowserRouter>
        <Drinks />
      </BrowserRouter>,
    );
    fetchMockDrinks.mockRestore();
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({ drinks: [{ idDrink: '1' }] }),
    } as any);
    const searchButton = screen.getByTestId(TestIds.SEARCH_TOP_BTN);
    await userEvent.click(searchButton);

    const radios = screen.getAllByRole('radio');
    await userEvent.click(radios[2]);

    const inputText = screen.getByTestId(TestIds.SEARCH_INPUT);
    await userEvent.type(inputText, 't');

    const execButton = screen.getByTestId(TestIds.EXEC_SEARCH_BTN);
    await userEvent.click(execButton);
  });
});
