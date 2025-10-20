import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateMercurialStrikeJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const mercurialStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.mercurialStrikeDamageDots || [false, false, false];
  const mercurialStrikeMoveHxDots = (sheet?.subclassProgressionDots as any)?.mercurialStrikeMoveHxDots || [false, false];
  const mercurialStrikeMultiStrikeDots = (sheet?.subclassProgressionDots as any)?.mercurialStrikeMultiStrikeDots || [false];
  
  // Calculate dynamic values
  const damageDice = 1 + mercurialStrikeDamageDots.filter(Boolean).length;
  const moveHx = 1 + mercurialStrikeMoveHxDots.filter(Boolean).length;
  const multiStrike = mercurialStrikeMultiStrikeDots[0] ? 1 : 0;
  
  return (
    <>
      <b><i style={{ color: '#351c75', fontSize: '1em' }}>Strike</i> <i>Damage.</i></b> <b>[{damageDice}]</b>d6. Your Damage type is based on your equipped <span style={{ fontStyle: 'italic', color: '#941c6c' }}>Mercurial Discipline</span>, <b><i style={{ color: '#38761d', fontSize: '1em' }}>Move</i></b> <b>[{moveHx}]</b>hx.{multiStrike > 0 && (
        <span style={{ marginLeft: 8 }}>
          +<b>[{multiStrike}]</b> <b><i style={{ color: '#351c75' }}>Strike</i></b>.
        </span>
      )}
    </>
  );
};

// Helper function for CharacterSheet Strike Damage display
export const generateMercurialStrikeDamageJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  const mercurialStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.mercurialStrikeDamageDots || [false, false, false];
  const damageDice = 1 + mercurialStrikeDamageDots.filter(Boolean).length;
  
  return (
    <>
      {damageDice}d6
    </>
  );
};

// Helper function for CharacterSheet Strike Effects display
export const generateMercurialStrikeEffectsJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  const mercurialStrikeMoveHxDots = (sheet?.subclassProgressionDots as any)?.mercurialStrikeMoveHxDots || [false, false];
  const moveHx = 1 + mercurialStrikeMoveHxDots.filter(Boolean).length;
  
  return <span style={{ color: '#000', fontWeight: 'normal' }}><b><i style={{ color: '#38761d' }}>Move</i></b> <b>[{moveHx}]</b>hx</span>;
};
