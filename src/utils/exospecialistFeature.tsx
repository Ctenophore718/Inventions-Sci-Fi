import React from 'react';

/**
 * Generate the Exosuit feature JSX
 * The Exosuit feature gives resistance to Bludgeoning, Piercing, and Slashing damage,
 * plus an additional 20 Hit Points.
 */
export function generateExosuitJSX(): React.ReactElement {
  return (
    <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
      <b><i style={{ color: '#117233', fontSize: '1em' }}>Exosuit.</i></b> <span style={{ fontSize: '1em', fontWeight: 400 }}>You <i>Resist</i> <b><span style={{ color: '#915927' }}><u>Bludgeoning</u></span></b> <img src="/Bludgeoning.png" alt="Bludgeoning" style={{ height: '1em', verticalAlign: 'middle', marginLeft: '2px', marginRight: '2px' }} />, <b><span style={{ color: '#a6965f' }}><u>Piercing</u></span></b> <img src="/Piercing.png" alt="Piercing" style={{ height: '1em', verticalAlign: 'middle', marginLeft: '2px', marginRight: '2px' }} /> and <b><span style={{ color: '#808080' }}><u>Slashing</u></span></b> <img src="/Slashing.png" alt="Slashing" style={{ height: '1em', verticalAlign: 'middle', marginLeft: '2px', marginRight: '2px' }} /> Damage and have an additional 20 <b><i><span style={{ color: '#990000' }}>Hit Points</span></i></b>.</span>
    </span>
  );
}
