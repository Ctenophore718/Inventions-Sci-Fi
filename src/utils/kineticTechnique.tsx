import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateGrandSlamJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const kineticTechniqueBounceHxDots = (sheet?.subclassProgressionDots as any)?.kineticTechniqueBounceHxDots || [false, false, false];
  const kineticTechniqueDamageDots = (sheet?.subclassProgressionDots as any)?.kineticTechniqueDamageDots || [false, false, false];
  const kineticTechniqueCooldownDots = (sheet?.subclassProgressionDots as any)?.kineticTechniqueCooldownDots || [false, false];
  
  // Calculate dynamic values
  const bounceHx = 10 + kineticTechniqueBounceHxDots.filter(Boolean).length * 3;
  const damageDice = 3 + kineticTechniqueDamageDots.filter(Boolean).length * 2;
  const cooldown = 4 - kineticTechniqueCooldownDots.filter(Boolean).length;
  
  return (
    <>
      <b><i style={{ color: '#7b941c', fontSize: '1em' }}>Grand Slam</i></b> <i style={{ color: '#7b941c', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> One adjacent creature takes <b>[{damageDice}]</b>d6 <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b> Damage and is <b><i>Bounced</i></b> <b>[{bounceHx}]</b>hx.
    </>
  );
};

export const generateGrandSlamCardJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const kineticTechniqueBounceHxDots = (sheet?.subclassProgressionDots as any)?.kineticTechniqueBounceHxDots || [false, false, false];
  const kineticTechniqueDamageDots = (sheet?.subclassProgressionDots as any)?.kineticTechniqueDamageDots || [false, false, false];
  
  // Calculate dynamic values
  const bounceHx = 10 + kineticTechniqueBounceHxDots.filter(Boolean).length * 3;
  const damageDice = 3 + kineticTechniqueDamageDots.filter(Boolean).length * 2;
  
  return (
    <>
      One adjacent creature takes <b>[{damageDice}]</b>d6 <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>Force<img src="/Force.png" alt="Force" style={{ width: 16, height: 16, verticalAlign: 'middle', marginLeft: 2 }} /></u></b> Damage and is <b><i>Bounced</i></b> <b>[{bounceHx}]</b>hx.
    </>
  );
};
