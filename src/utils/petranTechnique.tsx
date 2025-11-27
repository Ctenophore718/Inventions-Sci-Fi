import React from 'react';

export const generateStonyRestorationJSX = (cooldown: number, hitPointsDice: number, speedBoost: number) => {
  const speedText = speedBoost > 0 ? ` You also gain +${speedBoost} Speed this turn.` : '';
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#735311' }}>Stony Restoration</i></b> <span style={{ color: '#735311', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> You remove all conditions from yourself and gain <b>[{hitPointsDice}]</b>d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b> and +<b>[{speedBoost}]</b>hx <b><i style={{ color: '#38761d' }}>Speed</i></b> this turn.
    </span>
  );
};

export const generateStonyRestorationCardJSX = (cooldown: number, hitPointsDice: number, speedBoost: number) => {
  const speedText = speedBoost > 0 ? ` You also gain +${speedBoost} Speed this turn.` : '';
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      You remove all conditions from yourself and gain <b>[{hitPointsDice}]</b>d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b> and +<b>[{speedBoost}]</b>hx <b><i style={{ color: '#38761d' }}>Speed</i></b> this turn.
    </span>
  );
};
