import React from 'react';

/**
 * Generate the Rapid Regeneration feature JSX with dynamic values
 */
export function generateRapidRegenerationJSX({
  hitPointsDice = 1,
}: {
  hitPointsDice?: number;
} = {}): React.ReactElement {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#315f2b' }}>Rapid Regeneration.</i></b> You gain <b>[{hitPointsDice}]</b>d4 <b><i style={{ color: '#990000' }}>Hit Points</i></b> at the start of your turn. Additionally, your size is 1hx, 2hx, or 3hx, which is chosen at character creation.
    </span>
  );
}
