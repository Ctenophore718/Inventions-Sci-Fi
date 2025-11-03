import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateBarrageJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const dreadnaughtTechniqueExtraAttackDots = (sheet?.subclassProgressionDots as any)?.dreadnaughtTechniqueExtraAttackDots || [false];
  const dreadnaughtTechniqueCooldownDots = (sheet?.subclassProgressionDots as any)?.dreadnaughtTechniqueCooldownDots || [false, false];
  
  // Calculate dynamic values
  const numAttacks = dreadnaughtTechniqueExtraAttackDots[0] ? 2 : 1;
  const cooldownReduction = dreadnaughtTechniqueCooldownDots.filter(Boolean).length;
  const cooldown = 4 - cooldownReduction;
  
  return (
    <>
      <b><i style={{ color: '#d83da0' }}>Barrage</i></b> <i style={{ color: '#d83da0', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> Make <b>[{numAttacks}]</b> <b><i>Primary</i> <i style={{ color: '#990000' }}>Attack(s)</i></b> and <b>[{numAttacks}]</b> <b><i>Secondary</i> <i style={{ color: '#990000' }}>Attack(s)</i></b>, regardless of the <i>Cooldown</i> status of those <b><i style={{ color: '#990000' }}>Attacks</i></b>. These <b><i style={{ color: '#990000' }}>Attacks</i></b> do not trigger any <i>Cooldown</i>.
    </>
  );
};

// Version for Cards page (without technique name and cooldown in title)
export const generateBarrageCardJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const dreadnaughtTechniqueExtraAttackDots = (sheet?.subclassProgressionDots as any)?.dreadnaughtTechniqueExtraAttackDots || [false];
  
  // Calculate dynamic values
  const numAttacks = dreadnaughtTechniqueExtraAttackDots[0] ? 2 : 1;
  
  return (
    <>
      Make <b>[{numAttacks}]</b> <b><i>Primary</i> <i style={{ color: '#990000' }}>Attack(s)</i></b> and <b>[{numAttacks}]</b> <b><i>Secondary</i> <i style={{ color: '#990000' }}>Attack(s)</i></b>, regardless of the <i>Cooldown</i> status of those <b><i style={{ color: '#990000' }}>Attacks</i></b>. These <b><i style={{ color: '#990000' }}>Attacks</i></b> do not trigger any <i>Cooldown</i>.
    </>
  );
};
