import { render, fireEvent, RenderResult } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';

describe('Login component validation', () => {
  let component: RenderResult;
  let emailInput: Node | Window;
  let submitButton: Node | Window;
  let passwordInput: Node | Window;

  beforeEach(() => {
    component = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    emailInput = component.getByTestId('email-input');
    submitButton = component.getByTestId('login-submit-btn');
    passwordInput = component.getByTestId('password-input');
  });

  it('disables submit button when email is invalid', () => {
    fireEvent.change(emailInput, { target: { value: 'invalidEmail' } });

    expect(submitButton).toBeDisabled();
  });

  it('disables submit button when password is 6 characters or less', () => {
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when email and password are valid', () => {
    fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });

    expect(submitButton).not.toBeDisabled();
    fireEvent.click(submitButton);
  });
});
