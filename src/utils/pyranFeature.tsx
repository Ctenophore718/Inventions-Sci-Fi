import React from 'react';

export const generateIgnitionJSX = () => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#b31111' }}>Ignition.</i></b> You can choose to have your <b><i style={{ color: '#990000' }}>Attacks</i></b> and/or <b><i style={{ color: '#351c75' }}>Strikes</i></b> deal <b><u style={{ color: '#d63300', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> that also deal <b>[0]</b> instance(s) of <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#d63300', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b> at-will.
    </span>
  );
};
