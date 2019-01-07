require('./lib/dotenv');

import React from 'react';
import { Provider } from 'react-redux';

import neoblessed from 'neo-blessed';
import { createBlessedRenderer } from 'react-blessed';

import store from './store';

import App from './containers/app';

//
// Display

const render = createBlessedRenderer(neoblessed);

const screen = neoblessed.screen({
  autoPadding: true,
  smartCSR: true,
  fullUnicode: true,
  title: 't0d0'
});

screen.key(['escape', 'q', 'C-c'], (ch, key) => {
  return process.exit(0);
});

//
// Render
render(
  <Provider store={store}>
    <App />
  </Provider>,
  screen
);
