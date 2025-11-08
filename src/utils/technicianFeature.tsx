import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

// Version for Level Up page (with dynamic values)
export const generateMasterMechanicJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.charClass !== 'Technician') return null;

  const rangeBonus = 3 + (sheet?.classCardDots?.[0] ? sheet.classCardDots[0].filter(Boolean).length : 0);
  const hpBonus = 1 + (sheet?.classCardDots?.[1] ? sheet.classCardDots[1].filter(Boolean).length : 0);

  return (
    <>
      <b><i style={{ color: '#724811', fontSize: '1em' }}>Master Mechanic.</i></b> <span style={{ fontSize: '1em', fontWeight: 400 }}>Friendly <i>Drones</i>, <i><span style={{ color: '#2b3b5f' }}>Cognizants</span></i>, and <i><span style={{ color: '#117233' }}>Exospecialists</span></i> that start their turn within <b>[{rangeBonus}]</b>hx of you gain <b>[{hpBonus}]</b>d6 <i><b><span style={{ color: '#990000' }}>Hit Points</span></b></i>.</span>
    </>
  );
};

// Version for Character Sheet page (with dynamic values)
export const generateMasterMechanicCharacterSheetJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.charClass !== 'Technician') return null;

  const rangeBonus = 3 + (sheet?.classCardDots?.[0] ? sheet.classCardDots[0].filter(Boolean).length : 0);
  const hpBonus = 1 + (sheet?.classCardDots?.[1] ? sheet.classCardDots[1].filter(Boolean).length : 0);

  return (
    <>
      <b><i style={{ color: '#724811' }}>Master Mechanic.</i></b> Friendly <i>Drones</i>, <i style={{ color: '#2b3b5f' }}>Cognizants</i>, and <i style={{ color: '#117233' }}>Exospecialists</i> that start their turn within <b>[{rangeBonus}]</b>hx of you gain <b>[{hpBonus}]</b>d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b>.
    </>
  );
};
