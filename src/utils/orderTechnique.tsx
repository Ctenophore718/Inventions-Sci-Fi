import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateBulwarkJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const orderTechniqueRangeDots = (sheet?.subclassProgressionDots as any)?.orderTechniqueRangeDots || [false, false, false];
  const orderTechniqueSlamImmunityDots = (sheet?.subclassProgressionDots as any)?.orderTechniqueSlamImmunityDots || [false];
  const orderTechniqueBounceImmunityDots = (sheet?.subclassProgressionDots as any)?.orderTechniqueBounceImmunityDots || [false];
  const orderTechnique100CoverDots = (sheet?.subclassProgressionDots as any)?.orderTechnique100CoverDots || [false];
  const orderTechniqueCooldownDots = (sheet?.subclassProgressionDots as any)?.orderTechniqueCooldownDots || [false, false];
  
  // Calculate dynamic values
  const range = 1 + orderTechniqueRangeDots.filter(Boolean).length;
  const hasSlamImmunity = orderTechniqueSlamImmunityDots[0];
  const hasBounceImmunity = orderTechniqueBounceImmunityDots[0];
  const has100Cover = orderTechnique100CoverDots[0];
  const cooldown = 4 - orderTechniqueCooldownDots.filter(Boolean).length;
  const coverAmount = has100Cover ? '100%' : '50%';
  
  return (
    <>
  <b><i style={{ color: '#aeb15b', fontSize: '1em' }}>Bulwark</i></b> <i style={{ color: '#aeb15b', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> Until the beginning of the next round, whenever you take Damage, you subsequently provide <b>[{coverAmount}]</b> Cover, <b>[</b>{hasSlamImmunity ? <b><i>Slam</i></b> : ' - '}<b>]</b> <i>Immunity</i> and <b>[</b>{hasBounceImmunity ? <b><i>Bounce</i></b> : ' - '}<b>]</b> <i>Immunity</i> to yourself and each ally within <b>[{range}]</b>hx of you.
    </>
  );
};

export const generateBulwarkCardJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const orderTechniqueRangeDots = (sheet?.subclassProgressionDots as any)?.orderTechniqueRangeDots || [false, false, false];
  const orderTechniqueSlamImmunityDots = (sheet?.subclassProgressionDots as any)?.orderTechniqueSlamImmunityDots || [false];
  const orderTechniqueBounceImmunityDots = (sheet?.subclassProgressionDots as any)?.orderTechniqueBounceImmunityDots || [false];
  const orderTechnique100CoverDots = (sheet?.subclassProgressionDots as any)?.orderTechnique100CoverDots || [false];
  
  // Calculate dynamic values
  const range = 1 + orderTechniqueRangeDots.filter(Boolean).length;
  const hasSlamImmunity = orderTechniqueSlamImmunityDots[0];
  const hasBounceImmunity = orderTechniqueBounceImmunityDots[0];
  const has100Cover = orderTechnique100CoverDots[0];
  const coverAmount = has100Cover ? '100%' : '50%';
  
  return (
    <>
      Until the beginning of the next round, whenever you take Damage, you subsequently provide <b>[{coverAmount}]</b> Cover, <b>[</b>{hasSlamImmunity ? <b><i>Slam</i></b> : ' - '}<b>]</b> <i>Immunity</i> and <b>[</b>{hasBounceImmunity ? <b><i>Bounce</i></b> : ' - '}<b>]</b> <i>Immunity</i> to yourself and each ally within <b>[{range}]</b>hx of you.
    </>
  );
};
