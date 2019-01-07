import React, { Component } from 'react';
import { Grid } from 'react-blessed-contrib';

import Beers from '../beers';
import ShoppingList from '../shoppingList';
import Sonos from '../sonos';
import Ssdp from '../ssdp';
import Todos from '../todos';
import Weather from '../weather';

export default class App extends Component {
  render() {
    return (
      <Grid rows={3} cols={2}>
        <Todos row={0} col={0} rowSpan={1} colSpan={1} />
        <Beers row={1} col={0} rowSpan={2} colSpan={1} />
        <Weather row={0} col={1} rowSpan={1} colSpan={1} />
        <Sonos row={1} col={1} rowSpan={1} colSpan={1} />
        <ShoppingList row={2} col={1} rowSpan={1} colSpan={1} />
        {/*<Ssdp row={2} col={1} rowSpan={1} colSpan={1} />*/}
      </Grid>
    );
  }
}
