import React from 'react';

export const generateRaptorialClawsJSX = (strikeBonus: number) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#75904e' }}>Raptorial Claws.</i></b> You can <b><i style={{ color: '#351c75' }}>Strike</i></b> enemies in an adjacent hx during your <b><i style={{ color: '#38761d' }}>Move</i></b> instead of having to <b><i style={{ color: '#38761d' }}>Move</i></b> through them. Additionally, you gain +<b>[{strikeBonus}]</b> <b><i style={{ color: '#351c75' }}>Strikes</i></b>.
    </span>
  );
};
