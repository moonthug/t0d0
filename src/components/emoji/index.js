import React from 'react';
import emoji from 'node-emoji';

import { style, element } from './styles.js';

export default function Icon({ top, left, width, height, emojiName, text } = {}) {
  const emojiString = emoji.get(emojiName) || emoji.get('question');
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
      content={emojiString}

      //
      // Styles
      style={style}
      tags={element.tags}
      border={element.border}
    />
  );
}
