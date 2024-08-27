import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterList from './CharacterList';
import { BrowserRouter } from 'react-router-dom';

test('renders search input', () => {
  render(
    <BrowserRouter>
      <CharacterList />
    </BrowserRouter>
  );
  const searchInput = screen.getByLabelText(/search characters/i);
  expect(searchInput).toBeInTheDocument();
});

test('fetches and displays characters', async () => {
  render(
    <BrowserRouter>
      <CharacterList />
    </BrowserRouter>
  );
  expect(await screen.findByText(/Luke Skywalker/i)).toBeInTheDocument();
});
