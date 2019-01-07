import React from 'react';
import { style, element } from './styles.js';

export default function Card({ top, left, width, height, children } = {}) {
  return (
    <box
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
      style={style}
      tags={element.tags}
      border={element.border}
    >
      {children}
    </box>
  );
}
