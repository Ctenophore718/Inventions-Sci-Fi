import React from 'react';

export const generateGearsAndCogsJSX = (hasToxicImmunity: boolean, hasSleepImmunity: boolean) => {
  const toxicText = hasToxicImmunity ? <><b>[</b><i>Immune</i><b>]</b></> : <><b>[</b><i>Resistant</i><b>]</b></>;
  const sleepText = hasSleepImmunity ? <><b>[<i>Sleep</i>]</b></> : <><b>[ - ]</b></>;
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#2b3b5f' }}>Gears & Cogs.</i></b> You are {toxicText} to <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and are <i>Immune</i> to the <b><i>Drain</i></b> and {sleepText} condition(s) and can naturally survive in the vacuum of space.
    </span>
  );
};
