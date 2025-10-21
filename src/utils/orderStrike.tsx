import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateOrderStrikeJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const orderStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.orderStrikeDamageDots || [false, false, false];
  
  // Calculate dynamic values
  const damageDice = 1 + orderStrikeDamageDots.filter(Boolean).length;
  
  return (
    <>
      <b>[{damageDice}]</b>d6 <span style={{ color: '#516fff', textDecoration: 'underline', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}>
        Force
        <img src="/Force.png" alt="Force" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </span>
    </>
  );
};

export const generateOrderStrikeDamageJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const orderStrikeDamageDots = (sheet?.subclassProgressionDots as any)?.orderStrikeDamageDots || [false, false, false];
  
  // Calculate dynamic values
  const damageDice = 1 + orderStrikeDamageDots.filter(Boolean).length;
  
  return (
    <>
      {damageDice}d6&nbsp;
      <span style={{ color: '#516fff', textDecoration: 'underline', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}>
        Force
        <img src="/Force.png" alt="Force" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </span>
    </>
  );
};
