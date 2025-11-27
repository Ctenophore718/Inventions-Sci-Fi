import React from 'react';

export const generateBornOfFireJSX = (hasFireImmunity: boolean, hasFireAbsorption: boolean) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5f2b2b' }}>Born of Fire.</i></b> You <b>[</b><i>{hasFireAbsorption ? 'Absorb' : hasFireImmunity ? 'are Immune to' : 'Resist'}</i><b>]</b> <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and are <i>Immune</i> to the <b><i>Spike</i></b> condition.
    </span>
  );
};
