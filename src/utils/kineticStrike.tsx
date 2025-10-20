import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateKineticStrikeJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const kineticStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.kineticStrikeDamageDots || [false, false, false];
  const kineticStrikeSlamHxDots = (sheet?.subclassProgressionDots as any)?.kineticStrikeSlamHxDots || [false, false, false];
  const kineticStrikeRangeDots = (sheet?.subclassProgressionDots as any)?.kineticStrikeRangeDots || [false, false, false];
  
  // Calculate dynamic values
  const damageDice = 1 + kineticStrikeDamageDots.filter(Boolean).length;
  const slamHx = 3 + kineticStrikeSlamHxDots.filter(Boolean).length;
  const rangeBonus = kineticStrikeRangeDots.filter(Boolean).length;
  
  return (
    <>
      <b><i style={{ color: '#351c75', fontSize: '1em' }}>Strike</i> <i>Damage.</i></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
      Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u></b>, <b><i>Slam</i></b> <b>[{slamHx}]</b>hx{rangeBonus > 0 && <>, +<b>[{rangeBonus}]</b>hx <b><i style={{ color: '#351c75' }}>Strike</i></b> Range</>}.
    </>
  );
};

// Helper function for CharacterSheet Strike Damage display
export const generateKineticStrikeDamageJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  const kineticStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.kineticStrikeDamageDots || [false, false, false];
  const damageDice = 1 + kineticStrikeDamageDots.filter(Boolean).length;
  
  return (
    <>
      {damageDice}d6&nbsp;
      <span style={{ color: '#516fff', textDecoration: 'underline', fontWeight: 'bold', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center' }}>
        Force
        <img src="/Force.png" alt="Force" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </span>
    </>
  );
};

// Helper function for CharacterSheet Strike Effects display
export const generateKineticStrikeEffectsJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  const kineticStrikeSlamHxDots = (sheet?.subclassProgressionDots as any)?.kineticStrikeSlamHxDots || [false, false, false];
  const kineticStrikeRangeDots = (sheet?.subclassProgressionDots as any)?.kineticStrikeRangeDots || [false, false, false];
  const slamHx = 3 + kineticStrikeSlamHxDots.filter(Boolean).length;
  const rangeBonus = kineticStrikeRangeDots.filter(Boolean).length;
  
  return (
    <span style={{ color: '#000', fontWeight: 'normal' }}>
      <b><i>Slam</i></b> <b>[{slamHx}]</b>hx{rangeBonus > 0 && <>, +<b>[{rangeBonus}]</b>hx <b><i>Strike</i></b> Range</>}
    </span>
  );
};
