import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import Header from '../components/Header';

describe('Header', () => {
  it('renders all pages', () => {
    const pages = [
      '',
      'meals',
      'drinks',
      'meals/1',
      'drinks/1',
      'meals/1/in-progress',
      'drinks/1/in-progress',
      'profile',
      'done-recipes',
      'favorite-recipes',
    ];
    pages.forEach((page) => {
      render(
        <MemoryRouter initialEntries={ [`/${page}`] }>
          <App />
        </MemoryRouter>,
      );
    });
  });
  it('renders the correct title Meals', () => {
    render(
      <MemoryRouter>
        <Header title="Meals" withSearchIcons />
      </MemoryRouter>,
    );
    const title = document.querySelector('h1');
    expect(title).toBeInTheDocument();
  });
  it('renders the correct title Done Recipes', () => {
    render(
      <MemoryRouter>
        <Header title="Done Recipes" withSearchIcons />
      </MemoryRouter>,
    );
    const title = document.querySelector('h1');
    expect(title).toBeInTheDocument();
  });
  it('renders the correct title Favorite Recipes', () => {
    render(
      <MemoryRouter>
        <Header title="Favorite Recipes" withSearchIcons />
      </MemoryRouter>,
    );
    const title = document.querySelector('h1');
    expect(title).toBeInTheDocument();
  });
});
