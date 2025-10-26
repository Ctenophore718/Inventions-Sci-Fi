import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateEarthenWallJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const earthTechniqueAoEDots = (sheet?.subclassProgressionDots as any)?.earthTechniqueAoEDots || [false, false, false];
  const earthTechniqueBounceDots = (sheet?.subclassProgressionDots as any)?.earthTechniqueBounceDots || [false];
  const earthTechniqueCooldownDots = (sheet?.subclassProgressionDots as any)?.earthTechniqueCooldownDots || [false, false];
  
  // Calculate dynamic values
  const aoeChain = 6 + (earthTechniqueAoEDots.filter(Boolean).length * 3);
  const inflictsBounce = earthTechniqueBounceDots[0];
  const cooldown = 4 - earthTechniqueCooldownDots.filter(Boolean).length;
  
  return (
    <>
  <b><i style={{ color: '#e2b90e', fontSize: '1em' }}>Earthen Wall</i></b> <i style={{ color: '#e2b90e', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> You create a wall of earth in an <i>AoE</i> <b>[{aoeChain}]</b>hx-Chain originating adjacent to you. Each hx of earth inflicts <b>[</b>{inflictsBounce ? (<><b><i>Bounce</i></b> <span>3hx</span></>) : ' - '}<b>]</b>, provides 100% Cover and has 1 <b><i style={{ color: '#990000' }}>Hit Point</i></b>.
    </>
  );
};

export const generateEarthenWallCardJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const earthTechniqueAoEDots = (sheet?.subclassProgressionDots as any)?.earthTechniqueAoEDots || [false, false, false];
  const earthTechniqueBounceDots = (sheet?.subclassProgressionDots as any)?.earthTechniqueBounceDots || [false];
  
  // Calculate dynamic values
  const aoeChain = 6 + (earthTechniqueAoEDots.filter(Boolean).length * 3);
  const inflictsBounce = earthTechniqueBounceDots[0];
  
  return (
    <>
      You create a wall of earth in an <i>AoE</i> <b>[{aoeChain}]</b>hx-Chain originating adjacent to you. Each hx of earth inflicts <b>[</b>{inflictsBounce ? (<><b><i>Bounce</i></b> <span>3hx</span></>) : ' - '}<b>]</b>, provides 100% Cover and has 1 <b><i style={{ color: '#990000' }}>Hit Point</i></b>.
    </>
  );
};
