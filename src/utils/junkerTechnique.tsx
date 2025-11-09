import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateDetonateJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const junkerTechniqueAoEDots = (sheet?.subclassProgressionDots as any)?.junkerTechniqueAoEDots || [false, false];
  const junkerTechniqueSpikeDots = (sheet?.subclassProgressionDots as any)?.junkerTechniqueSpikeDots || [false, false, false];
  const junkerTechniqueCooldownDots = (sheet?.subclassProgressionDots as any)?.junkerTechniqueCooldownDots || [false, false];
  
  const aoeBonus = junkerTechniqueAoEDots.filter(Boolean).length;
  const spikeBonus = junkerTechniqueSpikeDots.filter(Boolean).length;
  const cooldownReduction = junkerTechniqueCooldownDots.filter(Boolean).length;
  
  const totalAoE = 2 + aoeBonus;
  const totalSpike = 2 + spikeBonus;
  const totalCooldown = 3 - cooldownReduction;
  
  return (
    <>
      <b><i style={{ color: '#6db857', fontSize: '1em' }}>Detonate</i></b> <i style={{ color: '#6db857', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{totalCooldown}]</b>).</i> You immediately blow up the <i>Drone</i> under your control. It deals <b>[{totalSpike}]</b> instances of <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b> Damage to all creatures in an <i>AoE</i> <b>[{totalAoE}]</b>hx-Radius.
    </>
  );
};

export const generateDetonateCardJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const junkerTechniqueAoEDots = (sheet?.subclassProgressionDots as any)?.junkerTechniqueAoEDots || [false, false];
  const junkerTechniqueSpikeDots = (sheet?.subclassProgressionDots as any)?.junkerTechniqueSpikeDots || [false, false, false];
  const junkerTechniqueCooldownDots = (sheet?.subclassProgressionDots as any)?.junkerTechniqueCooldownDots || [false, false];
  
  const aoeBonus = junkerTechniqueAoEDots.filter(Boolean).length;
  const spikeBonus = junkerTechniqueSpikeDots.filter(Boolean).length;
  const cooldownReduction = junkerTechniqueCooldownDots.filter(Boolean).length;
  
  const totalAoE = 2 + aoeBonus;
  const totalSpike = 2 + spikeBonus;
  const totalCooldown = 3 - cooldownReduction;
  
  return (
    <>
      You immediately blow up the <i>Drone</i> under your control. It deals <b>[{totalSpike}]</b> instances of <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b> Damage to all creatures in an <i>AoE</i> <b>[{totalAoE}]</b>hx-Radius.
    </>
  );
};
