import React from 'react';

export const generateStinkbugCloudJSX = (cooldown: number, rangeBonus: number, inflictSpike: boolean, spikeBonus: number, inflictDemoralize: boolean) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#334592' }}>Stinkbug Cloud</i></b> <span style={{ color: '#334592', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> Each enemy within <b>[{3 + rangeBonus}]</b>hx of you suffers the <b><i>Blind</i></b> condition{inflictSpike ? <span>, <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b><b>)</b> [<b>{1 + spikeBonus}</b>]</span> : ''}{inflictDemoralize ? <span>{inflictSpike ? ' and' : ','} <b><i>Demoralize</i></b></span> : ''}.
    </span>
  );
};

export const generateStinkbugCloudCardJSX = (rangeBonus: number, inflictSpike: boolean, spikeBonus: number, inflictDemoralize: boolean) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      Each enemy within <b>[{3 + rangeBonus}]</b>hx of you suffers the <b><i>Blind</i></b> condition{inflictSpike ? <span>, <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b><b>)</b> [<b>{1 + spikeBonus}</b>]</span> : ''}{inflictDemoralize ? <span>{inflictSpike ? ' and' : ','} <b><i>Demoralize</i></b></span> : ''}.
    </span>
  );
};
