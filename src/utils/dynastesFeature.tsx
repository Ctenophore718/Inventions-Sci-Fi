import React from 'react';

export const generateHerculeanJSX = (rangeBonus: number) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#334592' }}>Herculean.</i></b> Your size is 3hx. You are also <i>Immune</i> to the <b><i>Slam</i></b> and <b><i>Bounce</i></b> conditions. Additionally, when you inflict the <b><i>Slam</i></b> or <b><i>Bounce</i></b> condition, increase the forced <b><i style={{ color: '#38761d' }}>Movement</i></b> by <b>[{2 + rangeBonus}]</b>hx.
    </span>
  );
};
