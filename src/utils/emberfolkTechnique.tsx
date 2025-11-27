import React from 'react';

export const generateOppressiveHeatJSX = (cooldown: number, range: number, spikeCount: number, inflictDemoralize: boolean) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5f2b2b' }}>Oppressive Heat</i></b> <span style={{ color: '#5f2b2b', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> Enemies within <b>[{range}]</b>hx suffer <b>[{spikeCount}]</b> instance(s) of the <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b> condition and the <b>[{inflictDemoralize ? <i>Demoralize</i> : ' - '}]</b> condition.
    </span>
  );
};

export const generateOppressiveHeatCardJSX = (cooldown: number, range: number, spikeCount: number, inflictDemoralize: boolean) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      Enemies within <b>[{range}]</b>hx suffer <b>[{spikeCount}]</b> instance(s) of the <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b> condition and the <b>[{inflictDemoralize ? <i>Demoralize</i> : ' - '}]</b> condition.
    </span>
  );
};
