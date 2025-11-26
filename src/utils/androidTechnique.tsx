import React from 'react';

export const generateGlimpseTheMatrixJSX = (cooldown: number, allyCount: number) => {
  const allyText = allyCount > 0 ? ` +${allyCount} ally also gains this benefit.` : '';
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#581fbd' }}>Glimpse the Matrix</i></b> <span style={{ color: '#581fbd', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> Until after the start of the next round, you are considered within range of any allies' <b><i style={{ color: '#bf9000' }}>Techniques</i></b> and/or <b><i style={{ color: '#0b5394' }}>Features</i></b> regardless of your location on the battlefield.{allyText}
    </span>
  );
};

export const generateGlimpseTheMatrixCardJSX = (cooldown: number, allyCount: number) => {
  const allyText = allyCount > 0 ? ` +${allyCount} ally also gains this benefit.` : '';
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      Until after the start of the next round, you are considered within range of any allies' <b><i style={{ color: '#bf9000' }}>Techniques</i></b> and/or <b><i style={{ color: '#0b5394' }}>Features</i></b> regardless of your location on the battlefield.{allyText}
    </span>
  );
};
