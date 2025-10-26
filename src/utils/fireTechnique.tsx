import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateFirestormJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const fireTechniqueHxDots = (sheet?.subclassProgressionDots as any)?.fireTechniqueHxDots || [false, false, false];
  const fireTechniqueSpikeDots = (sheet?.subclassProgressionDots as any)?.fireTechniqueSpikeDots || [false, false, false];
  const fireTechniqueCooldownDots = (sheet?.subclassProgressionDots as any)?.fireTechniqueCooldownDots || [false, false];
  
  // Calculate dynamic values
  const hxRange = 5 + fireTechniqueHxDots.filter(Boolean).length;
  const spikeInstances = 1 + fireTechniqueSpikeDots.filter(Boolean).length;
  const cooldown = 4 - fireTechniqueCooldownDots.filter(Boolean).length;
  
  return (
    <>
      <b><i style={{ color: '#e20e0e', fontSize: '1em' }}>Firestorm</i></b> <i style={{ color: '#e20e0e', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> Enemies within <b>[{hxRange}]</b>hx lose <i>Resistance</i>, <i>Immunity</i> and/or <i>Absorption</i> to <b><u style={{ color: '#e20e0e', display: 'inline-flex', alignItems: 'center' }}>
      Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u></b> until the start of your next turn. They also suffer <b>[{spikeInstances}]</b> instance(s) of the <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#e20e0e', display: 'inline-flex', alignItems: 'center' }}>
      Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u></b><b>)</b> condition.
    </>
  );
};

export const generateFirestormCardJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const fireTechniqueHxDots = (sheet?.subclassProgressionDots as any)?.fireTechniqueHxDots || [false, false, false];
  const fireTechniqueSpikeDots = (sheet?.subclassProgressionDots as any)?.fireTechniqueSpikeDots || [false, false, false];
  
  // Calculate dynamic values
  const hxRange = 5 + fireTechniqueHxDots.filter(Boolean).length;
  const spikeInstances = 1 + fireTechniqueSpikeDots.filter(Boolean).length;
  
  return (
    <>
      Enemies within <b>[{hxRange}]</b>hx lose <i>Resistance</i>, <i>Immunity</i> and/or <i>Absorption</i> to <b><u style={{ color: '#e20e0e', display: 'inline-flex', alignItems: 'center' }}>
      Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u></b> until the start of your next turn. They also suffer <b>[{spikeInstances}]</b> instance(s) of the <b><i>Spike</i></b> <br />
      <b>(</b><b><u style={{ color: '#e20e0e', display: 'inline-flex', alignItems: 'center' }}>
      Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u></b><b>)</b> condition.
    </>
  );
};
