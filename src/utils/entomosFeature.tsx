import React from 'react';

export const generateInsectoidResistanceJSX = (hasMesmerizeImmunity: boolean, hasSleepImmunity: boolean) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5f2b57' }}>Insectoid Resistance.</i></b> You are <i>Immune</i> to the <b><i>Confuse</i></b>, <b>[{hasMesmerizeImmunity ? <i>Mesmerize</i> : ' - '}]</b> and <b>[{hasSleepImmunity ? <i>Sleep</i> : ' - '}]</b> condition(s) and fall <i>Damage</i>.
    </span>
  );
};
