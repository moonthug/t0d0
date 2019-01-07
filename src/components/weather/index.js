import React from 'react';
import { Grid } from 'react-blessed-contrib';

import { style, element } from './styles.js';

import Card from '../card';
import Emoji from '../emoji';

export default function Weather({ top, left, width, height, weather } = {}) {
  const renderDay = day => {
    return (
      <>
        <Emoji emojiName={weather.week.data[day].icon}/>
        <box top={2} tags={true} content={weather.week.data[day].time} />
        <box top={3} tags={true} content={`{bold}${weather.week.data[day].temperatureHigh.toFixed(1)}{/bold} / ${weather.week.data[day].temperatureLow.toFixed(1)}`} />
      </>
    );
  };

  return (
    <Card
      //
      // Position
      top={top}
      left={left}
      width={width}
      height={height}
    >
      <Grid rows={2} cols={5}>
        <box row={0} col={0} rowSpan={1} colSpan={5}>
          <box left={10}>{weather.current.summary}</box>
          <box left={10} top={1}>{weather.current.temperature.toFixed(1)}</box>
        </box>
        <box row={1} col={0} rowSpan={1} colSpan={1}>
          {renderDay(0)}
        </box>
        <box row={1} col={1} rowSpan={1} colSpan={1} >
          {renderDay(1)}
        </box>
        <box row={1} col={2} rowSpan={1} colSpan={1} >
          {renderDay(2)}
        </box>
        <box row={1} col={3} rowSpan={1} colSpan={1} >
          {renderDay(3)}
        </box>
        <box row={1} col={4} rowSpan={1} colSpan={1}>
          {renderDay(4)}
        </box>
      </Grid>
    </Card>
  );
}
