import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateBulletMagnetJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const tankerTechniqueCooldownDots = (sheet?.subclassProgressionDots as any)?.tankerTechniqueCooldownDots || [false, false];
  const tankerTechniqueRangeDots = (sheet?.subclassProgressionDots as any)?.tankerTechniqueRangeDots || [false, false, false];
  const tankerTechniqueResistDot = (sheet?.subclassProgressionDots as any)?.tankerTechniqueResistDot || [false];
  const tankerTechniqueImmuneDot = (sheet?.subclassProgressionDots as any)?.tankerTechniqueImmuneDot || [false];

  // Calculate dynamic values
  const cooldown = 4 - tankerTechniqueCooldownDots.filter(Boolean).length;
  const range = 3 + tankerTechniqueRangeDots.filter(Boolean).length;
  const resistText = tankerTechniqueResistDot[0] ? 'Resists' : ' - ';
  const immuneText = tankerTechniqueImmuneDot[0] ? 'Immune' : ' - ';

  return (
    <>
      <b><i style={{ color: '#b8578b', fontSize: '1em' }}>Bullet Magnet</i></b> <i style={{ color: '#b8578b', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> Until the beginning of the next turn, <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> made against you or allies within <b>[{range}]</b>hx of your <i>Drone</i> are automatically redirected toward your <i>Drone</i>. Additionally, your <i>Drone</i> <b>[{resistText}]</b> all Damage and is <b>[{immuneText}]</b> to all conditions.
    </>
  );
};

export const generateBulletMagnetCardJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const tankerTechniqueRangeDots = (sheet?.subclassProgressionDots as any)?.tankerTechniqueRangeDots || [false, false, false];
  const tankerTechniqueResistDot = (sheet?.subclassProgressionDots as any)?.tankerTechniqueResistDot || [false];
  const tankerTechniqueImmuneDot = (sheet?.subclassProgressionDots as any)?.tankerTechniqueImmuneDot || [false];

  // Calculate dynamic values
  const range = 3 + tankerTechniqueRangeDots.filter(Boolean).length;
  const resistText = tankerTechniqueResistDot[0] ? 'Resists' : ' - ';
  const immuneText = tankerTechniqueImmuneDot[0] ? 'Immune' : ' - ';

  return (
    <>
      Until the beginning of the next turn, <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> made against you or allies within <b>[{range}]</b>hx of your <i>Drone</i> are automatically redirected toward your <i>Drone</i>. Additionally, your <i>Drone</i> <b>[{resistText}]</b> all Damage and is <b>[{immuneText}]</b> to all conditions.
    </>
  );
};
