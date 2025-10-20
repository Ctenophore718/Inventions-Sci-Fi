import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateVectorialStrikeJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const vectorialStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.vectorialStrikeDamageDots || [false, false, false];
  const vectorialStrikeRangeDots = (sheet?.subclassProgressionDots as any)?.vectorialStrikeRangeDots || [false, false, false];
  const vectorialStrikeMultiStrikeDots = (sheet?.subclassProgressionDots as any)?.vectorialStrikeMultiStrikeDots || [false];
  
  // Calculate dynamic values
  const damageDice = 1 + vectorialStrikeDamageDots.filter(Boolean).length;
  const strikeRange = 4 + (vectorialStrikeRangeDots.filter(Boolean).length * 2);
  const multiStrike = vectorialStrikeMultiStrikeDots[0] ? 1 : 0;
  
  return (
    <>
      <b><i style={{ color: '#351c75', fontSize: '1em' }}>Strike</i> <i>Damage.</i></b> <b>[{damageDice}]</b>d6. Your Damage type is based on your equipped <i>Focus</i>, and your <b><i style={{ color: '#351c75', fontSize: '1em' }}>Strike</i></b> Range is <b>[{strikeRange}]</b>hx.{multiStrike > 0 && (
        <span style={{ marginLeft: 8 }}>
          +<b>[{multiStrike}]</b> <b><i style={{ color: '#351c75' }}>Strike</i></b>.
        </span>
      )}
    </>
  );
};

// Helper function for CharacterSheet Strike Damage display
export const generateVectorialStrikeDamageJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  const vectorialStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.vectorialStrikeDamageDots || [false, false, false];
  const damageDice = 1 + vectorialStrikeDamageDots.filter(Boolean).length;
  
  return (
    <>
      {damageDice}d6
    </>
  );
};

// Helper function for CharacterSheet Strike Range display
export const generateVectorialStrikeRangeJSX = (sheet: CharacterSheet | null): number => {
  const vectorialStrikeRangeDots = (sheet?.subclassProgressionDots as any)?.vectorialStrikeRangeDots || [false, false, false];
  return 4 + (vectorialStrikeRangeDots.filter(Boolean).length * 2);
};
