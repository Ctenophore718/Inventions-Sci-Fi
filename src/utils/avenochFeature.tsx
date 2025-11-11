import React from 'react';

/**
 * Generate the First in Flight feature JSX
 */
/**
 * Generate the First in Flight feature JSX with dynamic values
 */
export function generateFirstInFlightJSX({
  crit = 0,
  range = 0,
  move = 2,
}: {
  crit?: number;
  range?: number;
  move?: number;
} = {}): React.ReactElement {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#2b5f59' }}>First in Flight.</i></b> You have a <b><i style={{ color: '#38761d' }}>Flight Speed</i></b>. Additionally, you gain a +<b>[{crit}]</b> Crit and a +<b>[{range}]</b>hx Range to all <b><i style={{ color: '#990000' }}>Attacks</i></b>, and you can <b><i style={{ color: '#38761d' }}>Move</i></b> <b>[{move}]</b>hx whenever you Crit on an <b><i style={{ color: '#990000' }}>Attack</i></b>.
    </span>
  );
}
