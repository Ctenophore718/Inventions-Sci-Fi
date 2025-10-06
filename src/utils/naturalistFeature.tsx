import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateBoughbenderJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const naturalistFeatureDots = (sheet?.subclassProgressionDots as any)?.naturalistFeatureDots || [false, false, false];
  const naturalistFeatureDangerousDots = (sheet?.subclassProgressionDots as any)?.naturalistFeatureDangerousDots || [false];
  
  // Calculate dynamic values
  const range = 5 + naturalistFeatureDots.filter(Boolean).length;
  const hasDangerousTerrain = naturalistFeatureDangerousDots[0];
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#66cf00' }}>Boughbender.</i></b> You and allies within <b>[{range}]</b>hx may ignore <i>Obstacles</i>, <i>Rough Terrain</i> and <b>[</b><i>{hasDangerousTerrain ? 'Dangerous Terrain' : ' - '}</i><b>]</b> when <b><i style={{ color: '#38761d' }}>Moving</i></b>. Additionally, enemies treat <i>Terrain</i> within <b>[{range}]</b>hx of you as <i>Rough Terrain</i>.
    </span>
  );
};