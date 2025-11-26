import React from 'react';

export const generateClimbingCreeperJSX = (hasBurrowSpeed: boolean, hasBludgeoningResist: boolean) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5f5f2b' }}>Climbing Creeper.</i></b> You gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b> and a <b>[{hasBurrowSpeed ? 'Burrow' : ' - '}]</b> <b><i style={{ color: '#38761d' }}>Speed</i></b> and you <i>Resist</i> <b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and <b>[{hasBludgeoningResist ? <span><u style={{ color: '#915927' }}>Bludgeoning</u> <img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, verticalAlign: 'middle' }} /></span> : ' - '}]</b>.
    </span>
  );
};
