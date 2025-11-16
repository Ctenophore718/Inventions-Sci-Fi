import React from 'react';

interface EyesOfTheNightParams {
  critBonus?: number;
  rangeBonus?: number;
}

export const generateEyesOfTheNightJSX = (params?: EyesOfTheNightParams) => {
  const critBonus = params?.critBonus ?? 0;
  const rangeBonus = params?.rangeBonus ?? 0;
  
  return (
    <>
      <b><i style={{ color: '#334592' }}>Eyes of the Night.</i></b> You are <i>Immune</i> to the <b><i>Blind</i></b> condition and don't have a <i>Rear Arc</i>. Additionally, you gain a +<b>[{critBonus}]</b> Crit to all <b><i style={{ color: '#990000' }}>Attacks</i></b> and a +<b>[{rangeBonus}]</b>hx Range to any <b><i style={{ color: '#990000' }}>Attack</i></b> that initially has a Range of 2hx or higher. Whenever you Crit on an <b><i style={{ color: '#990000' }}>Attack</i></b>, you inflict the <b><i>Mesmerize</i></b> condition.
    </>
  );
};
