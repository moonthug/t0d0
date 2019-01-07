import React from 'react';
import { style, element } from './styles.js';

import Card from '../card';

export default function Todo({ top, left, width, height, todo } = {}) {
  return (
    <Card
      //
      // Position
      top={top}
      left={left}
      width={width}
      height={height}

      //
      // Styles
      style={style}
      tags={element.tags}
      border={element.border}
    >
      {todo.name}
    </Card>
  );
}
