import React from 'react';
import { style, element } from './styles.js';

export default function Icon({ top, left, width, height, children } = {}) {
  return (
    <ansiimage
      //
      // Position
      top={top}
      left={left}
      width={width}
      height={height}

      //
      // Data

      //
      // Styles
      file={__dirname + '/test.png'}
      style={style}
      border={element.border}
    >
    </ansiimage>
  );
}
