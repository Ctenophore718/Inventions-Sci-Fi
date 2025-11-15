import React from 'react';

type CrowsCunningParams = {
  hasDemoralizeImmunity?: boolean;
};

export const generateCrowsCunningJSX = ({ hasDemoralizeImmunity = false }: CrowsCunningParams = {}) => {
  return (
    <>
      <b><i style={{ color: '#75904e' }}>Crow's Cunning.</i></b> You are <i>Immune</i> to the <b><i>Confuse</i></b>, <b><i>Mesmerize</i></b> and <b>[{hasDemoralizeImmunity ? <i>Demoralize</i> : ' - '}]</b> conditions.
    </>
  );
};
