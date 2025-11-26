import React from 'react';

export const generateLocalAreaNetworkJSX = (cooldown: number, rangeBonus: number, techniqueBonus: number) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#2b3b5f' }}>Local Area Network</i></b> <span style={{ color: '#2b3b5f', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> Until the start of the next round, double the range of <b><i style={{ color: '#bf9000' }}>Techniques</i></b> used by you and any allies within <b>[{rangeBonus}]</b>hx of you. Additionally, any <b><i style={{ color: '#bf9000' }}>Technique</i></b> used within this range gets a -<b>[{techniqueBonus}]</b> to its <i>Cooldown</i>.
    </span>
  );
};

export const generateLocalAreaNetworkCardJSX = (cooldown: number, rangeBonus: number, techniqueBonus: number) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
    Until the start of the next round, double the range of <b><i style={{ color: '#bf9000' }}>Techniques</i></b> used by you and any allies within <b>[{rangeBonus}]</b>hx of you. Additionally, any <b><i style={{ color: '#bf9000' }}>Technique</i></b> used within this range gets a -<b>[{techniqueBonus}]</b> to its <i>Cooldown</i>.
    </span>
  );
};
