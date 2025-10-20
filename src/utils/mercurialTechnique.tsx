import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateHasteJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const mercurialTechniqueSpeedDots = (sheet?.subclassProgressionDots as any)?.mercurialTechniqueSpeedDots || [false, false, false];
  const mercurialTechniqueStrikeDots = (sheet?.subclassProgressionDots as any)?.mercurialTechniqueStrikeDots || [false, false, false];
  const mercurialTechniqueCooldownDots = (sheet?.subclassProgressionDots as any)?.mercurialTechniqueCooldownDots || [false, false];
  
  // Calculate dynamic values
  const speedBonus = 6 + mercurialTechniqueSpeedDots.filter(Boolean).length;
  const strikeBonus = 1 + mercurialTechniqueStrikeDots.filter(Boolean).length;
  const cooldown = 4 - mercurialTechniqueCooldownDots.filter(Boolean).length;
  
  return (
    <>
      <b><i style={{ color: '#941c6c', fontSize: '1em' }}>Haste</i></b> <i style={{ color: '#941c6c', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> You gain +<b>[{speedBonus}]</b> <b><i style={{ color: '#38761d', fontSize: '1em' }}>Speed</i></b> and +<b>[{strikeBonus}]</b> <b><i style={{ color: '#351c75', fontSize: '1em' }}>Strike</i></b> this turn.
    </>
  );
};

export const generateHasteCardJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const mercurialTechniqueSpeedDots = (sheet?.subclassProgressionDots as any)?.mercurialTechniqueSpeedDots || [false, false, false];
  const mercurialTechniqueStrikeDots = (sheet?.subclassProgressionDots as any)?.mercurialTechniqueStrikeDots || [false, false, false];
  
  // Calculate dynamic values
  const speedBonus = 6 + mercurialTechniqueSpeedDots.filter(Boolean).length;
  const strikeBonus = 1 + mercurialTechniqueStrikeDots.filter(Boolean).length;
  
  return (
    <>
      You gain +<b>[{speedBonus}]</b> <b><i style={{ color: '#38761d' }}>Speed</i></b> and +<b>[{strikeBonus}]</b> <b><i style={{ color: '#351c75' }}>Strike</i></b> this turn.
    </>
  );
};
