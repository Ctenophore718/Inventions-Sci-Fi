import React from 'react';

interface RendingTalonsParams {
  includesAttacks?: boolean;
  spike4Plus?: boolean;
}

export const generateRendingTalonsJSX = (params?: RendingTalonsParams) => {
  const includesAttacks = params?.includesAttacks ?? false;
  const spike4Plus = params?.spike4Plus ?? false;
  
  return (
    <>
      <b><i style={{ color: '#6d7156' }}>Rending Talons.</i></b> When you roll for <b><i>Spike</i></b> Damage on <b><i style={{ color: '#351c75' }}>Strikes</i></b> or <b>[{includesAttacks ? <i style={{ color: '#990000' }}>Attacks</i> : ' - '}]</b>, the <b><i>Spike</i></b> effect triggers on a roll of <b>[{spike4Plus ? '4' : '5'}]</b>+.
    </>
  );
};
