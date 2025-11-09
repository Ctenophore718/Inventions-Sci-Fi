import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateMobileGateJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  return (
    <>
      <b><i style={{ color: '#5c57b8', fontSize: '1em' }}>Mobile Gate.</i></b> Your allies can use you and your <i>Drone</i> as a pair of <i style={{ color: '#38761d' }}>Teleportation Gates</i>.
    </>
  );
};

export const generateMobileGateCharacterSheetJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  return (
    <>
      <b><i style={{ color: '#5c57b8', fontSize: '1em' }}>Mobile Gate.</i></b> Your allies can use you and your <i>Drone</i> as a pair of <i style={{ color: '#38761d' }}>Teleportation Gates</i>.
    </>
  );
};
