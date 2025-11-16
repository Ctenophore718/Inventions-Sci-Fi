import React from 'react';

interface DarknessDescendingParams {
  rangeBonus?: number;
  cooldown: number;
}

export const generateDarknessDescendingJSX = (params: DarknessDescendingParams) => {
  const rangeBonus = params.rangeBonus ?? 0;
  const baseRange = 5;
  const totalRange = baseRange + rangeBonus;
  
  return (
    <>
      <b><i style={{ color: '#334592' }}>Darkness Descending</i></b> <i style={{ color: '#334592', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{params.cooldown}]</b>).</i> Enemies within <b>[{totalRange}]</b>hx of you suffer the <b><i>Blind</i></b> condition.
    </>
  );
};

export const generateDarknessDescendingCardJSX = (params: DarknessDescendingParams) => {
  const rangeBonus = params.rangeBonus ?? 0;
  const baseRange = 5;
  const totalRange = baseRange + rangeBonus;
  
  return (
    <>
      Enemies within <b>[{totalRange}]</b>hx of you suffer the <b><i>Blind</i></b> condition.
    </>
  );
};
