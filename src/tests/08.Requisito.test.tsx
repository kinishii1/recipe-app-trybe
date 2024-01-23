import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

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
});
