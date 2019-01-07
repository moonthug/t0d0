import React from 'react';

import { style, element } from './styles.js';

export default function Spinner({ top, left, width, height } = {}) {
  return (
    <image
      //
      // Position
      top={top}
      left={left}
      height={3}

      //
      // Data
      type="ansi"
      file={__dirname + '/load_4.gif'}
      //
      // Styles
      style={style}
      tags={element.tags}
      border={element.border}
    />
  );
}
