import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Use MemoryRouter for routing
import Login from './Login';

// Mock the fetch function to simulate API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ username: 'testuser', password: 'testpassword' }]), // Mock the user data from the API
  })
);

// Mock the window.location.href to capture redirection
const originalHref = window.location.href;
beforeEach(() => {
  delete window.location;
  window.location = { href: originalHref };
});

test('Successful login redirects to dashboard', async () => {
  // Render the Login component wrapped in MemoryRouter for routing
  const { getByPlaceholderText, getByText } = render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  // Fill in the username and password inputs
  const usernameInput = getByPlaceholderText('Username');
  const passwordInput = getByPlaceholderText('Password');
  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

  // Click the login button
  const loginButton = getByText('Log in');
  fireEvent.click(loginButton);

  // Wait for the redirection to occur
  await waitFor(() => {
    expect(window.location.href).toMatch(/\/profile\?username=testuser$/); // Verify the expected redirection URL
  });

  // You can also add further assertions to verify elements on the dashboard page if needed
});
