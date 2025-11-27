import React from 'react';

export const generateMountainsEnduranceJSX = (
  hasBludgeoningImmunity: boolean,
  hasPiercingResistance: boolean,
  hasSlashingResistance: boolean,
  hasDrainImmunity: boolean
) => {
  const piercingDisplay = hasPiercingResistance ? (
    <b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>
  ) : (
    <b> - </b>
  );

  const slashingDisplay = hasSlashingResistance ? (
    <b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>
  ) : (
    <b> - </b>
  );

  const drainDisplay = hasDrainImmunity ? <i>Drain</i> : ' - ';

  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#735311' }}>Mountain's Endurance.</i></b> You are <b>[</b><i>{hasBludgeoningImmunity ? 'Immune' : 'Resistant'}</i><b>]</b> to <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and <i>Resistant</i> to <b>[</b>{piercingDisplay}<b>]</b> and <b>[</b>{slashingDisplay}<b>]</b> and are <i>Immune</i> to the <b><i>Demoralize</i></b> and <b>[{drainDisplay}]</b> condition(s). 
    </span>
  );
};
