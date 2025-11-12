import React from 'react';

/**
 * Generate the First in Flight feature JSX
 */
/**
 * Generate the First in Flight feature JSX with dynamic values
 */
export function generateFirstInFlightJSX({
  move = 2,
  moveWhenHit = 0,
}: {
  move?: number;
  moveWhenHit?: number;
} = {}): React.ReactElement {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#2b5f59' }}>First in Flight.</i></b> You have a <b><i style={{ color: '#38761d' }}>Fly Speed</i></b>. Additionally, you can <b><i style={{ color: '#38761d' }}>Move</i></b> <b>[{move}]</b>hx whenever you Crit on an <b><i style={{ color: '#990000' }}>Attack</i></b> and you can <b><i style={{ color: '#38761d' }}>Move</i></b> +<b>[{moveWhenHit}]</b>hx whenever you are hit by a <b><i style={{ color: '#351c75' }}>Strike</i></b>.
    </span>
  );
}
