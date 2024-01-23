import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';

describe('Login component', () => {
  let component;

  beforeEach(() => {
    component = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
  });

  it('renders email input with data-testid attribute', () => {
    const emailInput = component.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
  });

  it('renders password input with data-testid attribute', () => {
    const passwordInput = component.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
  });

  it('renders login submit button with data-testid attribute', () => {
    const submitButton = component.getByTestId('login-submit-btn');
    expect(submitButton).toBeInTheDocument();
  });
});
