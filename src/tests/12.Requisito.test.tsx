import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import {
  MealData,
  DrinkData,
} from './mocks/data';
import SearchBar from '../components/SearchBar';

enum TestIds {
  SEARCH_TOP_BTN = 'search-top-btn',
  SEARCH_INPUT = 'search-input',
  EXEC_SEARCH_BTN = 'exec-search-btn',
}

describe('SearchBar Meal', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(MealData),
    } as any);
    vi.spyOn(window, 'alert').mockImplementation(() => { });
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('radios works', async () => {
    render(
      <MemoryRouter>
        <SearchBar isDrink={ false } />
      </MemoryRouter>,
    );
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
    await userEvent.click(radios[0]);
    const searchInput = await screen.findByTestId(TestIds.SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();
    await userEvent.type(searchInput, 'chicken');
    const execSearchBtn = await screen.findByTestId(TestIds.EXEC_SEARCH_BTN);
    expect(execSearchBtn).toBeInTheDocument();
    await userEvent.click(execSearchBtn);
  });

  it('search works', async () => {
    render(
      <MemoryRouter>
        <SearchBar isDrink={ false } />
      </MemoryRouter>,
    );
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
    await userEvent.click(radios[1]);
    const searchInput = await screen.findByTestId(TestIds.SEARCH_INPUT);
    await userEvent.type(searchInput, 'chicken');
    const execSearchBtn = await screen.findByTestId(TestIds.EXEC_SEARCH_BTN);
    expect(execSearchBtn).toBeInTheDocument();
    await userEvent.click(execSearchBtn);
    expect(global.fetch).toBeCalledTimes(1);
  });
});

describe('SearchBar Drink', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(DrinkData),
    } as any);
    vi.spyOn(window, 'alert').mockImplementation(() => { });
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('radios works', async () => {
    render(
      <MemoryRouter>
        <SearchBar isDrink />
      </MemoryRouter>,
    );
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
    await userEvent.click(radios[2]);
    const searchInput = await screen.findByTestId(TestIds.SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();
    await userEvent.type(searchInput, 'apple');
    const execSearchBtn = await screen.findByTestId(TestIds.EXEC_SEARCH_BTN);
    expect(execSearchBtn).toBeInTheDocument();
    await userEvent.click(execSearchBtn);
  });
  it('search works', async () => {
    render(
      <MemoryRouter>
        <SearchBar isDrink />
      </MemoryRouter>,
    );
    const searchInput = await screen.findByTestId(TestIds.SEARCH_INPUT);
    await userEvent.type(searchInput, 'chicken');
    const execSearchBtn = await screen.findByTestId(TestIds.EXEC_SEARCH_BTN);
    expect(execSearchBtn).toBeInTheDocument();
    await userEvent.click(execSearchBtn);
    expect(global.fetch).toBeCalledTimes(1);
  });
});

describe('Alert Tests', () => {
  it('test alert for Meal', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve({ meals: null }),
    } as any);
    window.alert = vi.fn();
    render(
      <MemoryRouter>
        <SearchBar isDrink={ false } />
      </MemoryRouter>,
    );
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
    await userEvent.click(radios[0]);
    const searchInput = await screen.findByTestId(TestIds.SEARCH_INPUT);
    await userEvent.type(searchInput, 'chicken');
    const execSearchBtn = await screen.findByTestId(TestIds.EXEC_SEARCH_BTN);
    expect(execSearchBtn).toBeInTheDocument();
    await userEvent.click(execSearchBtn);
    expect(window.alert).toBeCalledTimes(1);
  });
  it('test alert for Drink', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve({ drinks: null }),
    } as any);
    window.alert = vi.fn();
    render(
      <MemoryRouter>
        <SearchBar isDrink />
      </MemoryRouter>,
    );
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
    await userEvent.click(radios[0]);
    const searchInput = await screen.findByTestId(TestIds.SEARCH_INPUT);
    await userEvent.type(searchInput, 'chicken');
    const execSearchBtn = await screen.findByTestId(TestIds.EXEC_SEARCH_BTN);
    expect(execSearchBtn).toBeInTheDocument();
    await userEvent.click(execSearchBtn);
  });
});
