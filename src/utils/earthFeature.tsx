import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateEarthArmorJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const earthFeatureBludgeoningImmunityDots = (sheet?.subclassProgressionDots as any)?.earthFeatureBludgeoningImmunityDots || [false];
  const earthFeatureBludgeoningAbsorptionDots = (sheet?.subclassProgressionDots as any)?.earthFeatureBludgeoningAbsorptionDots || [false];
  const earthFeatureSlashingResistanceDots = (sheet?.subclassProgressionDots as any)?.earthFeatureSlashingResistanceDots || [false];
  const earthFeatureSlashingImmunityDots = (sheet?.subclassProgressionDots as any)?.earthFeatureSlashingImmunityDots || [false];
  const earthFeatureSlamImmunityDots = (sheet?.subclassProgressionDots as any)?.earthFeatureSlamImmunityDots || [false];
  
  // Determine protection levels
  const hasBludgeoningImmunity = earthFeatureBludgeoningImmunityDots[0];
  const hasBludgeoningAbsorption = earthFeatureBludgeoningAbsorptionDots[0];
  const hasSlashingResistance = earthFeatureSlashingResistanceDots[0];
  const hasSlashingImmunity = earthFeatureSlashingImmunityDots[0];
  const hasSlamImmunity = earthFeatureSlamImmunityDots[0];
  
  let bludgeoningProtection = 'Resist';
  if (hasBludgeoningAbsorption) {
    bludgeoningProtection = 'Absorb';
  } else if (hasBludgeoningImmunity) {
    bludgeoningProtection = 'are Immune to';
  }
  
  let slashingProtection = ' - ';
  if (hasSlashingImmunity) {
    slashingProtection = 'are Immune to';
  } else if (hasSlashingResistance) {
    slashingProtection = 'Resist';
  }
  
  return (
    <>
      <b><i style={{ color: '#e2b90e', fontSize: '1em' }}>Earth Armor.</i></b> You <b>[</b><i>{bludgeoningProtection}</i><b>]</b> <b><u style={{ color: '#8B4513', display: 'inline-flex', alignItems: 'center' }}>
      Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u></b> Damage{slashingProtection && <>, and you <b>[</b><i>{slashingProtection}</i><b>]</b> <b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>
      Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
  </u></b></>}, and are <i>Immune</i> to <b>[</b><b><i>{hasSlamImmunity ? 'Slam' : ' - '}</i></b><b>]</b>.
    </>
  );
};
