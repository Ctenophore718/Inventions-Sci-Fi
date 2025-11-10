import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateIroncladJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  return (
    <>
      <b><i style={{ color: '#b8578b', fontSize: '1em' }}>Ironclad.</i></b> Your <i>Drone</i> has the <b><i style={{ color: '#38761d' }}>Mount</i></b> keyword. While <b><i style={{ color: '#38761d' }}>Mounting</i></b> the <i>Drone</i>, the <b><i style={{ color: '#38761d' }}>Rider</i></b> cannot be directly targeted by <b><i style={{ color: '#990000' }}>Attacks</i></b> or <b><i style={{ color: '#351c75' }}>Strikes</i></b>.
    </>
  );
};
