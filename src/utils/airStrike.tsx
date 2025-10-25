import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateAirStrikeJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const airStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.airStrikeDamageDots || [false];
  const airStrikeMultiStrikeDots = (sheet?.subclassProgressionDots as any)?.airStrikeMultiStrikeDots || [false, false];
  const airStrikeInflictSlamDots = (sheet?.subclassProgressionDots as any)?.airStrikeInflictSlamDots || [false];
  
  // Calculate dynamic values
  const damageDice = 1 + airStrikeDamageDots.filter(Boolean).length;
  const strikeCount = 1 + airStrikeMultiStrikeDots.filter(Boolean).length;
  const inflictsSlam = airStrikeInflictSlamDots[0];
  
  return (
    <>
      <b><i style={{ color: '#351c75', fontSize: '1em' }}>Strike</i> <i>Damage.</i></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
      Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u></b>, <b>[{strikeCount}]</b> <b><i style={{ color: '#351c75' }}>Strike{strikeCount > 1 ? 's' : ''}</i></b>{inflictsSlam && <>, Inflict <b><i>Slam</i></b> 3hx</>}.
    </>
  );
};

// Helper function for CharacterSheet Strike Damage display
export const generateAirStrikeDamageJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  const airStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.airStrikeDamageDots || [false];
  const damageDice = 1 + airStrikeDamageDots.filter(Boolean).length;
  
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
