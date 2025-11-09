import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generatePortalSwapJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const hackerTechniqueHitPointsDots = (sheet?.subclassProgressionDots as any)?.hackerTechniqueHitPointsDots || [false, false, false];
  const hackerTechniqueSpikeDots = (sheet?.subclassProgressionDots as any)?.hackerTechniqueSpikeDots || [false, false, false];
  const hackerTechniqueCooldownDots = (sheet?.subclassProgressionDots as any)?.hackerTechniqueCooldownDots || [false, false];

  // Calculate dynamic values
  const hitPoints = hackerTechniqueHitPointsDots.filter(Boolean).length;
  const spikeValue = hackerTechniqueSpikeDots.filter(Boolean).length;
  const cooldown = 3 - hackerTechniqueCooldownDots.filter(Boolean).length;

  return (
    <>
      <b><i style={{ color: '#5c57b8', fontSize: '1em' }}>Portal Swap</i></b> <i style={{ color: '#5c57b8', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> You and your <i>Drone</i> gain <b>[{hitPoints}]</b>d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b>, immediately switch places and deal <b>[{spikeValue}]</b> instances of <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b> to all adjacent creatures from both locations.
    </>
  );
};

export const generatePortalSwapCardJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const hackerTechniqueHitPointsDots = (sheet?.subclassProgressionDots as any)?.hackerTechniqueHitPointsDots || [false, false, false];
  const hackerTechniqueSpikeDots = (sheet?.subclassProgressionDots as any)?.hackerTechniqueSpikeDots || [false, false, false];
  
  // Calculate dynamic values
  const hitPoints = hackerTechniqueHitPointsDots.filter(Boolean).length;
  const spikeValue = hackerTechniqueSpikeDots.filter(Boolean).length;
  
  return (
    <>
      You and your <i>Drone</i> gain <b>[{hitPoints}]</b>d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b>, immediately switch places and deal <b>[{spikeValue}]</b> instances of <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b> to all adjacent creatures from both locations.
    </>
  );
};
