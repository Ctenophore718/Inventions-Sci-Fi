import React from 'react';

export const generateRootboundJSX = (
  cooldown: number,
  aoeRange: number,
  spikeToxicCount: number,
  inflictDemoralize: boolean
) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5f5f2b' }}>Rootbound</i></b> <span style={{ color: '#5f5f2b', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> All enemies within <b>[{aoeRange}]</b>hx of you suffer the <b><i>Restrain</i></b> and <b>[{inflictDemoralize ? <i>Demoralize</i> : ' - '}]</b> condition(s) and <b>[{spikeToxicCount}]</b> instance(s) of <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b>.
    </span>
  );
};

export const generateRootboundCardJSX = (
  aoeRange: number,
  spikeToxicCount: number,
  inflictDemoralize: boolean
) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      All enemies within <b>[{aoeRange}]</b>hx of you suffer the <b><i>Restrain</i></b> and <b>[{inflictDemoralize ? <i>Demoralize</i> : ' - '}]</b> condition(s) and <b>[{spikeToxicCount}]</b> instance(s) of <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b>.
    </span>
  );
};
