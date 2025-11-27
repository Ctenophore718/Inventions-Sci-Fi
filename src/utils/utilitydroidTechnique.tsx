import React from 'react';

export const generateTechInterferenceJSX = (cooldown: number, rangeBonus: number, spikeCount: number) => {
  const range = 10 + rangeBonus;
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#bd891f' }}>Tech Interference</i></b> <span style={{ color: '#bd891f', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> Until the start of the next round, <i>Teleportation Gates</i>, <i><b style={{ color: '#134f5c' }}>Consoles</b></i>, <i><b style={{ color: '#38761d' }}>Technologic</b></i> <i><b style={{ color: '#351c75' }}>Items</b></i>, computers and other technologic equipment within <b>[{range}]</b>hx of you cannot be used. This does not include <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> or <b><i style={{ color: '#bf9000' }}>Techniques</i></b>. You also deal <b>[{spikeCount}]</b> instance(s) of <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>Electric<img src="/Electric.png" alt="Electric" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b> to each creature within <b>[{range}]</b>hx of you.
    </span>
  );
};

export const generateTechInterferenceCardJSX = (cooldown: number, rangeBonus: number, spikeCount: number) => {
  const range = 10 + rangeBonus;
  
  return (
    <span style={{ color: '#000', fontWeight: 400, fontSize: '0.9em' }}>
      Until the start of the next round, <i>Teleportation Gates</i>, <i><b style={{ color: '#134f5c' }}>Consoles</b></i>, <i><b style={{ color: '#38761d' }}>Technologic</b></i> <i><b style={{ color: '#351c75' }}>Items</b></i>, computers and other technologic equipment within <b>[{range}]</b>hx of you cannot be used. This does not include <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> or <b><i style={{ color: '#bf9000' }}>Techniques</i></b>. You also deal <b>[{spikeCount}]</b> instance(s) of <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>Electric<img src="/Electric.png" alt="Electric" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b> to each creature within <b>[{range}]</b>hx of you.
    </span>
  );
};
