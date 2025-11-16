import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateDiveBombJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const aeronautTechniqueCooldownDots = (sheet?.subclassProgressionDots as any)?.aeronautTechniqueCooldownDots || [false, false];
  const aeronautTechniqueBounceDots = (sheet?.subclassProgressionDots as any)?.aeronautTechniqueBounceDots || [false];
  const aeronautTechniqueSpikeDots = (sheet?.subclassProgressionDots as any)?.aeronautTechniqueSpikeDots || [false];
  const aeronautTechniqueAoEDots = (sheet?.subclassProgressionDots as any)?.aeronautTechniqueAoEDots || [false];
  
  // Calculate dynamic values
  const cooldown = 3 - aeronautTechniqueCooldownDots.filter(Boolean).length;
  const bounceText = aeronautTechniqueBounceDots[0] ? <><b><i>Bounce</i></b> 3hx</> : <> <b>-</b> </>;
  const spikeText = aeronautTechniqueSpikeDots[0] 
    ? <><b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#575757', display: 'inline-flex', alignItems: 'center' }}>Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b></>
    : <> <b>-</b> </>;
  const aoeRadius = aeronautTechniqueAoEDots[0] ? 1 : 0;
  
  return (
    <>
      <b><i style={{ color: '#3da1d8', fontSize: '1em' }}>Dive Bomb</i></b> <i style={{ color: '#3da1d8', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> The next time you <b><i style={{ color: '#351c75' }}>Strike</i></b> this turn, you gain an additional Damage die for each hx you've <b><i style={{ color: '#38761d' }}>Moved</i></b> this turn. Additionally, you inflict <b>[</b>{bounceText}<b>]</b>, <b>[</b>{spikeText}<b>]</b> and the <b><i style={{ color: '#351c75' }}>Strike</i></b> has an <i>AoE</i> <b>[{aoeRadius}]</b>hx-Radius.
    </>
  );
};

export const generateDiveBombCardJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const aeronautTechniqueBounceDots = (sheet?.subclassProgressionDots as any)?.aeronautTechniqueBounceDots || [false];
  const aeronautTechniqueSpikeDots = (sheet?.subclassProgressionDots as any)?.aeronautTechniqueSpikeDots || [false];
  const aeronautTechniqueAoEDots = (sheet?.subclassProgressionDots as any)?.aeronautTechniqueAoEDots || [false];
  
  // Calculate dynamic values
  const bounceText = aeronautTechniqueBounceDots[0] ? <><b><i>Bounce</i></b> 3hx</> : <> <b>-</b> </>;
  const spikeText = aeronautTechniqueSpikeDots[0] 
    ? <><b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#575757', display: 'inline-flex', alignItems: 'center' }}>Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b></>
    : <> <b>-</b> </>;
  const aoeRadius = aeronautTechniqueAoEDots[0] ? 1 : 0;
  
  // For the card version, we don't include the cooldown text
  return (
    <>
      The next time you <b><i style={{ color: '#351c75' }}>Strike</i></b> this turn, you gain an additional Damage die for each hx you've <b><i style={{ color: '#38761d' }}>Moved</i></b> this turn. Additionally, you inflict <b>[</b>{bounceText}<b>]</b>, <b>[</b>{spikeText}<b>]</b> and the <b><i style={{ color: '#351c75' }}>Strike</i></b> has an <i>AoE</i> <b>[{aoeRadius}]</b>hx-Radius.
    </>
  );
};
