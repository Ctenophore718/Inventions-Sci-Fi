import React from 'react';

export const generateSapSuckerJSX = (healDouble?: boolean) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#2b2d5f' }}>Sap Sucker.</i></b> Whenever you heal as a result of the <b><i>Drain</i></b> condition, you heal <b>[{healDouble ? 'double' : 'all of'}]</b> the amount of Damage done instead of half.
    </span>
  );
};
