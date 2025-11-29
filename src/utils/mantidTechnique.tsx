import React from 'react';

export const generatePinDownJSX = (cooldown: number, rangeBonus: number, spikeBonus: number, inflictDemoralize: boolean) => {
  const demoralizeText = inflictDemoralize ? <i>Demoralize</i> : ' - ';
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#75904e' }}>Pin Down</i></b> <span style={{ color: '#75904e', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> Each enemy within <b>[{3 + rangeBonus}]</b>hx of you suffers the <b><i>Restrain</i></b> and <b>[{demoralizeText}]</b> condition(s) and also suffers <b>[{spikeBonus}]</b> instance(s) of <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b><b>)</b>.
    </span>
  );
};

export const generatePinDownCardJSX = (rangeBonus: number, spikeBonus: number, inflictDemoralize: boolean) => {
  const demoralizeText = inflictDemoralize ? <i>Demoralize</i> : ' - ';
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      Each enemy within <b>[{3 + rangeBonus}]</b>hx of you suffers the <b><i>Restrain</i></b> and <b>[{demoralizeText}]</b> condition(s) and also suffers <b>[{spikeBonus}]</b> instance(s) of <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b><b>)</b>.
    </span>
  );
};
