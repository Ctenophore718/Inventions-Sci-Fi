import React from 'react';

export const generateEncryptedCerebralCortexJSX = (hasNeuralResistance: boolean, hasNeuralImmunity: boolean, hasMesmerizeImmunity: boolean) => {
  const neuralText = hasNeuralImmunity ? <><b>[</b><i>Immune</i><b>]</b></> : hasNeuralResistance ? <><b>[</b><i>Resistant</i><b>]</b></> : <><b>[ - ]</b></>;
  const mesmerizeText = hasMesmerizeImmunity ? <><b>[<i>Mesmerize</i>]</b></> : <><b>[ - ]</b></>;
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#581fbd' }}>Encrypted Cerebral Cortex.</i></b> You are {neuralText} to <b><i>Neural</i></b> <i>Damage</i> and are <i>Immune</i> to the <b><i>Confuse</i></b> and {mesmerizeText} condition(s).
    </span>
  );
};
