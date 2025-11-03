import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateTheOlOneTwoJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const brawlerTechniqueCooldownDots = (sheet?.subclassProgressionDots as any)?.brawlerTechniqueCooldownDots || [false, false];
  const brawlerTechniqueRangeDots = (sheet?.subclassProgressionDots as any)?.brawlerTechniqueRangeDots || [false, false, false];
  const brawlerTechniqueSlamDots = (sheet?.subclassProgressionDots as any)?.brawlerTechniqueSlamDots || [false, false, false];
  const brawlerTechniqueSpikeDots = (sheet?.subclassProgressionDots as any)?.brawlerTechniqueSpikeDots || [false];
  
  // Calculate dynamic values
  const cooldown = 4 - brawlerTechniqueCooldownDots.filter(Boolean).length;
  const range = 3 + brawlerTechniqueRangeDots.filter(Boolean).length;
  const slamDistance = 3 + brawlerTechniqueSlamDots.filter(Boolean).length;
  const hasSpike = brawlerTechniqueSpikeDots[0];
  
  return (
    <>
      <b><i style={{ color: '#d8a53d', fontSize: '1em' }}>The Ol' One-Two</i></b> <i style={{ color: '#d8a53d', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> Until the beginning of the next round, <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> and <b><i style={{ color: '#351c75' }}>Strikes</i></b> made by you and all allies within <b>[{range}]</b>hx inflict <b><i>Slam</i></b> <b>[{slamDistance}]</b>hx and <b>[</b>{hasSpike ? (<><b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b></>) : ' - '}<b>]</b>.
    </>
  );
};

export const generateTheOlOneTwoCardJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const brawlerTechniqueRangeDots = (sheet?.subclassProgressionDots as any)?.brawlerTechniqueRangeDots || [false, false, false];
  const brawlerTechniqueSlamDots = (sheet?.subclassProgressionDots as any)?.brawlerTechniqueSlamDots || [false, false, false];
  const brawlerTechniqueSpikeDots = (sheet?.subclassProgressionDots as any)?.brawlerTechniqueSpikeDots || [false];
  
  // Calculate dynamic values
  const range = 3 + brawlerTechniqueRangeDots.filter(Boolean).length;
  const slamDistance = 3 + brawlerTechniqueSlamDots.filter(Boolean).length;
  const hasSpike = brawlerTechniqueSpikeDots[0];
  
  // For the card version, we don't include the cooldown text
  return (
    <>
      Until the beginning of the next round, <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> and <b><i style={{ color: '#351c75' }}>Strikes</i></b> made by you and all allies within <b>[{range}]</b>hx inflict <b><i>Slam</i></b> <b>[{slamDistance}]</b>hx and <br />
      <b>[</b>{hasSpike ? (<><b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b></>) : ' - '}<b>]</b>.
    </>
  );
};
