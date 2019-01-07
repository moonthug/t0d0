import React from 'react';
import { style, element } from './styles.js';

export default function Panel({ top, left, width, height, label, children } = {}) {
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
      label={label}

      //
      // Styles
      style={style}
      tags={element.tags}
      padding={element.padding}
      border={element.border}
    >
      {children}
    </box>
  );
}
