export const generateFeralRageJSX = (
  cooldown: number,
  moveBonus: number,
  spikeSlashing: number,
  speedBonus: number
) => {
  return (
    <>
      <b><i style={{ color: '#5f2b5c' }}>Feral Rage</i></b> <span style={{ color: '#5f2b5c', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> You and allies within <b>[{moveBonus}]</b>hx gain +<b>[{speedBonus}]</b>hx <b><i style={{ color: '#38761d' }}>Speed</i></b>, ignore <i>Rough</i> and <i>Dangerous Terrain</i> and inflict <b>[{spikeSlashing}]</b> instance(s) <b><i>Spike</i></b> <b>(<u style={{ color: '#888', display: 'inline-flex', alignItems: 'center' }}>Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u>)</b> when making <b><i style={{ color: '#351c75' }}>Strikes</i></b> until the start of the next round.
    </>
  );
};

export const generateFeralRageCardJSX = (
  moveBonus: number,
  spikeSlashing: number,
  speedBonus: number
) => {
  return (
    <>
      You and allies within <b>[{2 + moveBonus}]</b>hx gain +<b>[{speedBonus}]</b>hx <b><i style={{ color: '#38761d' }}>Speed</i></b>, ignore <i>Rough</i> and <i>Dangerous Terrain</i> and inflict <b>[{spikeSlashing}]</b> instance(s) <b><i>Spike</i></b> <b>(<u style={{ color: '#888', display: 'inline-flex', alignItems: 'center' }}>Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u>)</b> when making <b><i style={{ color: '#351c75' }}>Strikes</i></b> until the start of the next round.
    </>
  );
};
