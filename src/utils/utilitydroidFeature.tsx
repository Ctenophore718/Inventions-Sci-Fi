import React from 'react';

export const generateVariantUtilityJSX = (hasSwimSpeed: boolean, hasBurrowSpeed: boolean, hasFlightSpeed: boolean) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#bd891f' }}>Variant Utility.</i></b> Your size is 1hx, 2hx, or 3hx, chosen at character creation, and you gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b>, a <b>[{hasSwimSpeed ? 'Swim' : ' - '}]</b> <b><i style={{ color: '#38761d' }}>Speed</i></b>, a <b>[{hasBurrowSpeed ? 'Burrow' : ' - '}]</b> <b><i style={{ color: '#38761d' }}>Speed</i></b> and/or a <b>[{hasFlightSpeed ? 'Fly' : ' - '}]</b> <b><i style={{ color: '#38761d' }}>Speed</i></b>.
    </span>
  );
};
