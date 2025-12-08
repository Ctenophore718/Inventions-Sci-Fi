export const generateSensoryDistortionJSX = (cooldown: number, range: number, d20Penalty: number) => {
  return (
    <>
      <b><i style={{ color: '#bea97f' }}>Sensory Distortion</i></b> <span style={{ color: '#bea97f', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> Until the start of the next round, whenever an enemy targets you or an ally within <b>[{range}]</b>hx with an <b><i><span style={{ color: '#990000' }}>Attack</span></i></b>, roll 1d20. On a <b>[{11 + d20Penalty}]</b>+, you reselect the target to another valid target for the <b><i><span style={{ color: '#990000' }}>Attacker</span></i></b>.
    </>
  );
};

export const generateSensoryDistortionCardJSX = (range: number, d20Penalty: number) => {
  return (
    <>
      Until the start of the next round, whenever an enemy targets you or an ally within <b>[{range}]</b>hx with an <b><i><span style={{ color: '#990000' }}>Attack</span></i></b>, roll 1d20. On a <b>[{11 + d20Penalty}]</b>+, you reselect the target to another valid target for the <b><i><span style={{ color: '#990000' }}>Attacker</span></i></b>.
    </>
  );
};
