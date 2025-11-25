import React from 'react';

export const generateCottonGuardJSX = (
  cooldown: number,
  aoeRange: number,
  fullCover: boolean
) => {
  const coverAmount = fullCover ? '100%' : '50%';
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5f8a5f' }}>Cotton Guard</i></b> <span style={{ color: '#5f8a5f', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> You and allies within <b>[{aoeRange}]</b>hx gain <b>[{coverAmount}]</b> <i>Cover</i> until the start of the next round.
    </span>
  );
};

export const generateCottonGuardCardJSX = (
  aoeRange: number,
  fullCover: boolean
) => {
  const coverAmount = fullCover ? '100%' : '50%';
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      You and allies within <b>[{aoeRange}]</b>hx gain <b>[{coverAmount}]</b> <i>Cover</i> until the start of the next round.
    </span>
  );
};
