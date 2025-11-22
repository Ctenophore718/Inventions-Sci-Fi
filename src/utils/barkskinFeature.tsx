import React from 'react';

interface DeepRootsParams {
  mesmerizeImmunity?: boolean;
}

export const generateDeepRootsJSX = (params?: DeepRootsParams) => {
  const mesmerizeImmunity = params?.mesmerizeImmunity ?? false;
  
  return (
    <>
      <b><i style={{ color: '#5f2d2b' }}>Deep Roots.</i></b> You are <i>Immune</i> to the <b><i>Slam</i></b>, <b><i>Bounce</i></b> and <b>[{mesmerizeImmunity ? <i>Mesmerize</i> : ' - '}]</b> conditions.
    </>
  );
};
