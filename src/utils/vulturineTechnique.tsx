import React from 'react';

interface FleshEaterParams {
  rangeBonus?: number;
  cooldown: number;
}

export const generateFleshEaterJSX = (params: FleshEaterParams) => {
  const rangeBonus = params.rangeBonus ?? 0;
  const baseRange = 5;
  const totalRange = baseRange + rangeBonus;
  
  return (
    <>
      <b><i style={{ color: '#a96d8c' }}>Flesh Eater</i></b> <i style={{ color: '#a96d8c', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{params.cooldown}]</b>).</i> Until the start of the next round, <b><i style={{ color: '#990000' }}>Attacks</i></b> and <b><i style={{ color: '#351c75' }}>Strikes</i></b> made by you or allies within <b>[{totalRange}]</b>hx inflict the <b><i>Drain</i></b> condition.
    </>
  );
};

export const generateFleshEaterCardJSX = (params: FleshEaterParams) => {
  const rangeBonus = params.rangeBonus ?? 0;
  const baseRange = 5;
  const totalRange = baseRange + rangeBonus;
  
  return (
    <>
      Until the start of the next round, <b><i style={{ color: '#990000' }}>Attacks</i></b> and <b><i style={{ color: '#351c75' }}>Strikes</i></b> made by you or allies within <b>[{totalRange}]</b>hx inflict the <b><i>Drain</i></b> condition.
    </>
  );
};
