import React from 'react';

interface DarkenedDisplacerParams {
  range?: number;
  cooldown?: number;
  inflictDemoralize?: boolean;
}

export const generateDarkenedDisplacerJSX = (params?: DarkenedDisplacerParams) => {
  const range = params?.range ?? 6;
  const cooldown = params?.cooldown ?? 4;
  const inflictDemoralize = params?.inflictDemoralize ?? false;
  
  return (
    <>
      <b><i style={{ color: '#75904e' }}>Darkened Displacer</i></b> <span style={{ color: '#75904e', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> Choose an ally within <b>[{range}]</b>hx of you. You inflict the <b><i>Blind</i></b> and <b>[{inflictDemoralize ? <i>Demoralize</i> : ' - '}]</b> condition(s) on all enemies adjacent to you and the chosen ally. You then trade places with the ally.
    </>
  );
};

export const generateDarkenedDisplacerCardJSX = (params?: DarkenedDisplacerParams) => {
  const range = params?.range ?? 6;
  const inflictDemoralize = params?.inflictDemoralize ?? false;
  
  return (
    <>
      Choose an ally within <b>[{range}]</b>hx of you. You inflict the <b><i>Blind</i></b> and <b>[{inflictDemoralize ? <i>Demoralize</i> : ' - '}]</b> condition(s) on all enemies adjacent to you and the chosen ally. You then trade places with the ally.
    </>
  );
};
